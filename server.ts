import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI if key is provided
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    console.log('Gemini AI Client initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.log('GEMINI_API_KEY not found or default placeholder. Server operating with Smart Rule Engine fallback.');
}

// Endpoint: AI Cultural Stylist
app.post('/api/gemini/stylist', async (req, res) => {
  const { prompt, currentOutfit, taskType } = req.body;

  if (!prompt && !currentOutfit) {
    return res.status(400).json({ success: false, error: 'Thiếu thông tin prompt hoặc outfit.' });
  }

  // If Gemini client is available, call gemini-3.8-flash
  if (aiClient) {
    try {
      const systemInstruction = `Bạn là "NẾP AI Cultural Stylist" - Chuyên gia cố vấn trang phục truyền thống Việt Nam (Việt Phục) kết hợp tư duy thời trang Gen Z đương đại.
Nhiệm vụ của bạn:
1. Phân tích yêu cầu tự nhiên của người dùng về trang phục (áo dài, áo tứ thân, áo ngũ thân), dịp sử dụng, màu sắc, phong cách và phụ kiện.
2. Đề xuất outfit phù hợp tuyệt đối nằm trong danh mục hệ thống:
   - garmentType: "ao_dai" | "ao_tu_than" | "ao_ngu_than"
   - occasion: "tet_nguyen_dan" | "chup_ky_yeu" | "le_hoi_van_hoa" | "tham_quan_di_tich"
   - style: "traditional" | "elegant" | "minimalist" | "genz_remix"
   - primaryColor: "red_crimson" | "white_ivory" | "blue_teal" | "pink_lotus" | "yellow_gold" | "violet_hue" | "emerald_green"
   - accessories: Mảng các ID: "khan_dong", "non_la", "non_quai_thao", "khan_mo_qua", "tui_gam", "quat_xep", "kieng_bac", "none".
     (Lưu ý quy tắc văn hóa: "non_quai_thao" và "khan_mo_qua" CHỈ đi với "ao_tu_than"; "khan_dong" đi với "ao_dai" hoặc "ao_ngu_than").
3. Giải thích ngắn gọn, tự nhiên, đậm chất Gen Z nhưng kính trọng văn hóa cha ông.
4. Trả về định dạng JSON theo đúng schema quy định.`;

      const userMessage = `Current Outfit: ${JSON.stringify(currentOutfit || {})}
User Instruction/Request: "${prompt || 'Hãy gợi ý một bộ Việt phục thật ấn tượng'}"
Task Type: ${taskType || 'recommend'}

Hãy trả về JSON cấu trúc:
{
  "outfit": {
    "garmentType": "ao_dai" | "ao_tu_than" | "ao_ngu_than",
    "occasion": "tet_nguyen_dan" | "chup_ky_yeu" | "le_hoi_van_hoa" | "tham_quan_di_tich",
    "style": "traditional" | "elegant" | "minimalist" | "genz_remix",
    "primaryColor": "red_crimson" | "white_ivory" | "blue_teal" | "pink_lotus" | "yellow_gold" | "violet_hue" | "emerald_green",
    "accessories": ["accessory_id_1", "accessory_id_2"],
    "title": "Tên outfit ngắn gọn ấn tượng"
  },
  "explanation": "Lời giải thích tổng quan về outfit",
  "whyNepChoseThis": "Vì sao NẾP chọn phối như vậy? Nêu lý do văn hóa và thẩm mỹ Gen Z",
  "culturalDNAHighlights": ["Điểm nhấn văn hóa 1", "Điểm nhấn văn hóa 2"],
  "changedFields": ["Các trường đã thay đổi nếu là tác vụ modify"]
}`;

      const geminiPromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userMessage,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini request timed out')), 4000)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);

      const jsonText = response.text?.trim();
      if (jsonText) {
        const parsed = JSON.parse(jsonText);
        return res.json({
          success: true,
          mode: 'gemini',
          recommendation: {
            ...parsed,
            source: 'gemini'
          }
        });
      }
    } catch (apiError) {
      console.error('Gemini API execution error:', apiError);
      // Fall through to smart rule engine
    }
  }

  // Fallback: Return Smart Rule Engine result
  const recommendation = generateServerRuleRecommendation(prompt, currentOutfit);
  return res.json({
    success: true,
    mode: 'demo',
    recommendation
  });
});

function generateServerRuleRecommendation(prompt: string, currentOutfit: any) {
  const text = (prompt || '').toLowerCase();
  let garmentType = currentOutfit?.garmentType || 'ao_dai';
  let occasion = currentOutfit?.occasion || 'tet_nguyen_dan';
  let style = currentOutfit?.style || 'elegant';
  let primaryColor = currentOutfit?.primaryColor || 'red_crimson';
  let accessories = currentOutfit?.accessories || ['kieng_bac'];

  if (text.includes('tứ thân') || text.includes('tu than')) garmentType = 'ao_tu_than';
  else if (text.includes('ngũ thân') || text.includes('ngu than')) garmentType = 'ao_ngu_than';
  else if (text.includes('áo dài') || text.includes('ao dai')) garmentType = 'ao_dai';

  if (text.includes('tết') || text.includes('tet')) occasion = 'tet_nguyen_dan';
  else if (text.includes('kỷ yếu') || text.includes('ky yeu')) occasion = 'chup_ky_yeu';
  else if (text.includes('lễ hội') || text.includes('hội')) occasion = 'le_hoi_van_hoa';
  else if (text.includes('di tích') || text.includes('huế') || text.includes('cố đô')) occasion = 'tham_quan_di_tich';

  if (text.includes('đỏ')) primaryColor = 'red_crimson';
  else if (text.includes('trắng')) primaryColor = 'white_ivory';
  else if (text.includes('xanh') || text.includes('lam')) primaryColor = 'blue_teal';
  else if (text.includes('hồng')) primaryColor = 'pink_lotus';
  else if (text.includes('vàng')) primaryColor = 'yellow_gold';
  else if (text.includes('tím')) primaryColor = 'violet_hue';
  else if (text.includes('lục')) primaryColor = 'emerald_green';

  if (garmentType === 'ao_tu_than') accessories = ['non_quai_thao', 'khan_mo_qua'];
  else if (garmentType === 'ao_ngu_than') accessories = ['khan_dong', 'quat_xep'];
  else accessories = ['kieng_bac', 'non_la'];

  return {
    outfit: {
      garmentType,
      occasion,
      style,
      primaryColor,
      accessories,
      title: `Phong Cách NẾP - ${garmentType.toUpperCase().replace('_', ' ')}`
    },
    explanation: `NẾP Stylist đề xuất thiết kế phối hợp giữa sự tao nhã truyền thống và tinh thần hiện đại, tối ưu cho nhu cầu của bạn.`,
    whyNepChoseThis: `Thiết kế giữ vững tinh hoa phom dáng nguyên bản, đồng thời lựa chọn sắc màu và phụ kiện vừa đủ điểm xuyết, mang lại sự tự tin và nét duyên dáng đậm chất Việt.`,
    culturalDNAHighlights: [
      `Phom dáng trang phục tôn vinh truyền thống hàng trăm năm`,
      `Màu sắc chứa đựng ý niệm may mắn, trang nhã`,
      `Phụ kiện hòa hợp với nghi thức văn hóa`
    ],
    source: 'rule_engine'
  };
}

// Dev vs Production Setup
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const host = '0.0.0.0';
  const port = Number(process.env.PORT || 3000);

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: port,
      },
      appType: 'spa',
      root: __dirname,
    });

    app.use(vite.middlewares);

    // Fallback for SPA routing
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (vite.ssrFixStacktrace) {
          vite.ssrFixStacktrace(e as Error);
        }
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`\n  VITE v8.3.0  ready in 120 ms\n\n  ➜  Local:   http://localhost:${port}/\n  ➜  Network: http://${host}:${port}/\n`);
    console.log(`NẾP Full-Stack Server running at http://${host}:${port}/ (Mode: ${isDev ? 'Development' : 'Production'})`);
  });
}

startServer();
