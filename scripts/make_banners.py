import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('src/photo', exist_ok=True)

try:
    font_title = ImageFont.truetype('segoeuib.ttf', 44)
    font_subtitle = ImageFont.truetype('segoeui.ttf', 22)
    font_bold = ImageFont.truetype('segoeuib.ttf', 32)
    font_kpi_val = ImageFont.truetype('segoeuib.ttf', 36)
    font_kpi_lbl = ImageFont.truetype('segoeui.ttf', 16)
    font_badge = ImageFont.truetype('segoeuib.ttf', 16)
except Exception:
    font_title = font_subtitle = font_bold = font_kpi_val = font_kpi_lbl = font_badge = ImageFont.load_default()

# ── 1. EMPLOYEE ATTRITION BANNER ─────────────────────────────
W, H = 1200, 750
im1 = Image.new('RGB', (W, H), color='#0a1512')
d1 = ImageDraw.Draw(im1)

for y in range(H):
    ratio = y / H
    r = int(10 + 12 * ratio)
    g = int(22 + 28 * ratio)
    b = int(18 + 16 * ratio)
    d1.line([(0, y), (W, y)], fill=(r, g, b))

d1.rounded_rectangle([70, 50, 360, 92], radius=21, fill='#064e3b', outline='#10b981', width=2)
d1.text((95, 60), 'AI WORKFORCE INTELLIGENCE', fill='#34d399', font=font_badge)

d1.text((70, 110), 'Employee Attrition System', fill='#ffffff', font=font_title)
d1.text((70, 168), 'Predictive Workforce Risk Analytics & Gemini 2.5 Copilot', fill='#94a3b8', font=font_subtitle)

card_x, card_y, card_w, card_h = 70, 220, 1060, 470
d1.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#111f1c', outline='#243a34', width=2)

kpis = [
    ('Total Headcount', '1,470', '#34d399'),
    ('Turnover Rate', '16.1%', '#f87171'),
    ('Retention Count', '1,233', '#60a5fa'),
    ('High Flight Risk', '142', '#fbbf24')
]

for i, (lbl, val, col) in enumerate(kpis):
    kx = card_x + 35 + i * 250
    ky = card_y + 35
    d1.rounded_rectangle([kx, ky, kx + 230, ky + 115], radius=16, fill='#192d27', outline='#2a483f', width=1)
    d1.text((kx + 20, ky + 20), lbl, fill='#94a3b8', font=font_kpi_lbl)
    d1.text((kx + 20, ky + 52), val, fill=col, font=font_kpi_val)

cx1, cy1, cw1, ch1 = card_x + 35, card_y + 180, 580, 250
d1.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#152622', outline='#243a34', width=1)
d1.text((cx1 + 25, cy1 + 20), 'Department Turnover & OverTime Impact (Chart.js)', fill='#cbd5e1', font=font_badge)

points = [(cx1 + 40, cy1 + 190), (cx1 + 120, cy1 + 150), (cx1 + 210, cy1 + 175), 
          (cx1 + 300, cy1 + 105), (cx1 + 390, cy1 + 125), (cx1 + 480, cy1 + 80), (cx1 + 540, cy1 + 60)]
for j in range(len(points)-1):
    d1.line([points[j], points[j+1]], fill='#10b981', width=4)
for pt in points:
    d1.ellipse([pt[0]-5, pt[1]-5, pt[0]+5, pt[1]+5], fill='#34d399')

cx2, cy2, cw2, ch2 = card_x + 645, card_y + 180, 380, 250
d1.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#152622', outline='#243a34', width=1)
d1.text((cx2 + 25, cy2 + 20), 'AttritionAI Copilot (Gemini 2.5)', fill='#a7f3d0', font=font_badge)
d1.rounded_rectangle([cx2 + 20, cy2 + 60, cx2 + cw2 - 20, cy2 + 145], radius=12, fill='#1e3730')
d1.text((cx2 + 30, cy2 + 75), 'Ask: "Predict flight risk for Sales Reps', fill='#e2e8f0', font=font_kpi_lbl)
d1.text((cx2 + 30, cy2 + 102), 'with overtime > 15 hours..."', fill='#e2e8f0', font=font_kpi_lbl)

d1.text((cx2 + 25, cy2 + 165), 'Grounded in Verified Cohort Data', fill='#34d399', font=font_kpi_lbl)
d1.text((cx2 + 25, cy2 + 198), 'Individual Lookup by Employee ID', fill='#38bdf8', font=font_kpi_lbl)

im1.save('frontend/src/photo/attrition_banner.png', 'PNG')
im1.save('frontend/src/photo/attrition_banner.webp', 'WEBP', quality=95)
print('attrition_banner.png and .webp saved!')

# ── 2. TASTIFYY BANNER ───────────────────────────────────────
im2 = Image.new('RGB', (W, H), color='#150e06')
d2 = ImageDraw.Draw(im2)

for y in range(H):
    ratio = y / H
    r = int(21 + 24 * ratio)
    g = int(14 + 18 * ratio)
    b = int(6 + 8 * ratio)
    d2.line([(0, y), (W, y)], fill=(r, g, b))

# Category Badge with centered text
top_text = 'ON-DEMAND FOOD PLATFORM'
tb_box = d2.textbbox((0, 0), top_text, font=font_badge)
tb_w = tb_box[2] - tb_box[0]
tb_h = tb_box[3] - tb_box[1]
tb_pad_h = 22
tb_pad_v = 10
tb_x1 = 70
tb_y1 = 50
tb_x2 = tb_x1 + tb_w + tb_pad_h * 2
tb_y2 = tb_y1 + tb_h + tb_pad_v * 2
d2.rounded_rectangle([tb_x1, tb_y1, tb_x2, tb_y2], radius=20, fill='#7c2d12', outline='#f97316', width=2)
d2.text((tb_x1 + tb_pad_h - tb_box[0], tb_y1 + tb_pad_v - tb_box[1]), top_text, fill='#fdba74', font=font_badge)

d2.text((70, 110), 'Tastifyy Delivery Ecosystem', fill='#ffffff', font=font_title)
d2.text((70, 168), 'Multi-Role Food Delivery Platform (Web + Mobile App)', fill='#fed7aa', font=font_subtitle)

card2_x, card2_y, card2_w, card2_h = 70, 220, 1060, 470
d2.rounded_rectangle([card2_x, card2_y, card2_x + card2_w, card2_y + card2_h], radius=24, fill='#23170c', outline='#432818', width=2)

pillars = [
    ('Customer Portal', 'Web + Mobile', 'Real-time ordering & live order tracking', '#fb923c'),
    ('Restaurant Partner', 'Menu & Order Panel', 'Live catalog, dish variants & revenue analytics', '#facc15'),
    ('Delivery Partner', 'Driver App', 'Automated job assignment & route navigation', '#4ade80'),
    ('Platform Admin', 'Central Oversight', 'Partner approvals, commission & dispute support', '#38bdf8'),
]

for i, (title, sub, desc, col) in enumerate(pillars):
    px = card2_x + 35 + (i % 2) * 505
    py = card2_y + 35 + (i // 2) * 200
    pw, ph = 485, 175
    d2.rounded_rectangle([px, py, px + pw, py + ph], radius=18, fill='#2e1f13', outline='#4a3321', width=1)
    
    # Calculate exact text dimensions for dynamic pill sizing
    bbox = d2.textbbox((0, 0), sub, font=font_badge)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    pad_h = 16
    pad_v = 7
    pill_w = tw + pad_h * 2
    pill_h = th + pad_v * 2
    
    pill_x1 = px + 22
    pill_y1 = py + 20
    pill_x2 = pill_x1 + pill_w
    pill_y2 = pill_y1 + pill_h
    
    # Perfectly fitted pill container
    d2.rounded_rectangle([pill_x1, pill_y1, pill_x2, pill_y2], radius=10, fill='#3f2818', outline=col, width=1)
    
    # Vertically and horizontally centered pill label
    tx = pill_x1 + pad_h - bbox[0]
    ty = pill_y1 + pad_v - bbox[1]
    d2.text((tx, ty), sub, fill=col, font=font_badge)
    
    # Title & description with clean spacing
    d2.text((px + 22, py + 66), title, fill='#ffffff', font=font_bold)
    d2.text((px + 22, py + 118), desc, fill='#fed7aa', font=font_kpi_lbl)

im2.save('frontend/src/photo/tastifyy_banner.png', 'PNG')
im2.save('frontend/src/photo/tastifyy_banner.webp', 'WEBP', quality=95)
if os.path.exists('src/photo'):
    im2.save('src/photo/tastifyy_banner.png', 'PNG')
    im2.save('src/photo/tastifyy_banner.webp', 'WEBP', quality=95)
print('tastifyy_banner.png and .webp saved with dynamic alignment!')
