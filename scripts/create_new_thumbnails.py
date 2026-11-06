import os
from PIL import Image, ImageDraw, ImageFont

output_dir = 'frontend/src/photo'
os.makedirs(output_dir, exist_ok=True)

try:
    font_title = ImageFont.truetype('segoeuib.ttf', 44)
    font_subtitle = ImageFont.truetype('segoeui.ttf', 22)
    font_bold = ImageFont.truetype('segoeuib.ttf', 30)
    font_kpi_val = ImageFont.truetype('segoeuib.ttf', 32)
    font_kpi_val_small = ImageFont.truetype('segoeuib.ttf', 24)
    font_kpi_lbl = ImageFont.truetype('segoeui.ttf', 16)
    font_badge = ImageFont.truetype('segoeuib.ttf', 16)
    font_small = ImageFont.truetype('segoeui.ttf', 15)
except Exception:
    font_title = font_subtitle = font_bold = font_kpi_val = font_kpi_val_small = font_kpi_lbl = font_badge = font_small = ImageFont.load_default()

W, H = 1200, 750

def draw_kpi(draw, card_x, card_y, i, lbl, val, col, bg='#1e293b', border='#334155'):
    kx = card_x + 35 + i * 250
    ky = card_y + 35
    draw.rounded_rectangle([kx, ky, kx + 230, ky + 115], radius=16, fill=bg, outline=border, width=1)
    draw.text((kx + 20, ky + 20), lbl, fill='#94a3b8', font=font_kpi_lbl)
    font_to_use = font_kpi_val_small if len(val) >= 12 else font_kpi_val
    y_off = 58 if len(val) >= 12 else 52
    draw.text((kx + 20, ky + y_off), val, fill=col, font=font_to_use)

def save_dual(img, base_name):
    png_path = os.path.join(output_dir, f'{base_name}.png')
    webp_path = os.path.join(output_dir, f'{base_name}.webp')
    img.save(png_path, 'PNG')
    img.save(webp_path, 'WEBP', quality=95)
    print(f'Saved {png_path} and {webp_path}')

# ══════════════════════════════════════════════════════════════════
# 1. SOLAR INTELLIGENCE BANNER
# ══════════════════════════════════════════════════════════════════
im_solar = Image.new('RGB', (W, H), color='#0b1320')
d_solar = ImageDraw.Draw(im_solar)

for y in range(H):
    ratio = y / H
    r = int(11 + 18 * ratio)
    g = int(19 + 25 * ratio)
    b = int(32 + 35 * ratio)
    d_solar.line([(0, y), (W, y)], fill=(r, g, b))

# Badge
d_solar.rounded_rectangle([70, 50, 360, 92], radius=21, fill='#451a03', outline='#f59e0b', width=2)
d_solar.text((95, 60), 'CLEANTECH BIG DATA & GIS', fill='#fbbf24', font=font_badge)

# Title & Subtitle
d_solar.text((70, 110), 'Solar Intelligence Platform', fill='#ffffff', font=font_title)
d_solar.text((70, 168), 'Geospatial GIS Heatmaps & Nationwide Time-Series Capacity Forecasting', fill='#94a3b8', font=font_subtitle)

card_x, card_y, card_w, card_h = 70, 220, 1060, 470
d_solar.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#0f172a', outline='#334155', width=2)

solar_kpis = [
    ('Capacity Evaluated', '81.8+ GW', '#fbbf24'),
    ('Geospatial Scope', '36+ States', '#38bdf8'),
    ('Time-Series Data', '2014 – 2024', '#34d399'),
    ('Forecast Horizon', 'Projected 2030', '#f43f5e'),
]

for i, (lbl, val, col) in enumerate(solar_kpis):
    draw_kpi(d_solar, card_x, card_y, i, lbl, val, col, bg='#1e293b', border='#334155')

cx1, cy1, cw1, ch1 = card_x + 35, card_y + 180, 580, 250
d_solar.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#1e293b', outline='#334155', width=1)
d_solar.text((cx1 + 25, cy1 + 20), 'Capacity Growth Trajectory & Polynomial Curve (GW)', fill='#cbd5e1', font=font_badge)

for gy in range(cy1 + 65, cy1 + 215, 35):
    d_solar.line([(cx1 + 35, gy), (cx1 + cw1 - 35, gy)], fill='#334155', width=1)

points_solar = [
    (cx1 + 45, cy1 + 195),
    (cx1 + 120, cy1 + 180),
    (cx1 + 200, cy1 + 160),
    (cx1 + 280, cy1 + 130),
    (cx1 + 360, cy1 + 105),
    (cx1 + 440, cy1 + 75),
    (cx1 + 530, cy1 + 50)
]
for j in range(len(points_solar) - 1):
    d_solar.line([points_solar[j], points_solar[j+1]], fill='#f59e0b', width=4)
for pt in points_solar:
    d_solar.ellipse([pt[0]-6, pt[1]-6, pt[0]+6, pt[1]+6], fill='#fbbf24', outline='#ffffff', width=1)

d_solar.text((cx1 + 45, cy1 + 205), '2014 (3 GW)', fill='#64748b', font=font_small)
d_solar.text((cx1 + 270, cy1 + 205), '2020 (35 GW)', fill='#64748b', font=font_small)
d_solar.text((cx1 + 460, cy1 + 205), '2030 (180+ GW Exp)', fill='#f59e0b', font=font_small)

cx2, cy2, cw2, ch2 = card_x + 645, card_y + 180, 380, 250
d_solar.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#1e293b', outline='#334155', width=1)
d_solar.text((cx2 + 25, cy2 + 20), 'Data Pipeline & GIS Analytics', fill='#38bdf8', font=font_badge)

features_solar = [
    ('Ingested 500+ MNRE Historical Records', '#38bdf8'),
    ('Polynomial Regression Curve Fitting', '#fbbf24'),
    ('Choropleth Heatmaps for 36+ Regions', '#34d399'),
    ('High-Concurrency PostgreSQL Queries', '#a78bfa'),
]
for idx, (feat, f_col) in enumerate(features_solar):
    d_solar.text((cx2 + 25, cy2 + 65 + idx * 42), feat, fill=f_col, font=font_small)

save_dual(im_solar, 'solar_analytics')


# ══════════════════════════════════════════════════════════════════
# 2. PASHURAKSHAK BANNER
# ══════════════════════════════════════════════════════════════════
im_pashu = Image.new('RGB', (W, H), color='#061712')
d_pashu = ImageDraw.Draw(im_pashu)

for y in range(H):
    ratio = y / H
    r = int(6 + 10 * ratio)
    g = int(23 + 28 * ratio)
    b = int(18 + 20 * ratio)
    d_pashu.line([(0, y), (W, y)], fill=(r, g, b))

# Badge
d_pashu.rounded_rectangle([70, 50, 420, 92], radius=21, fill='#064e3b', outline='#10b981', width=2)
d_pashu.text((95, 60), 'EDGE COMPUTING & COMPUTER VISION', fill='#34d399', font=font_badge)

# Title & Subtitle
d_pashu.text((70, 110), 'PashuRakshak Diagnostics', fill='#ffffff', font=font_title)
d_pashu.text((70, 168), 'Quantized Edge CNNs & Offline Livestock Disease Detection Platform', fill='#94a3b8', font=font_subtitle)

d_pashu.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#0d1f1a', outline='#1e3d33', width=2)

pashu_kpis = [
    ('Inference Mode', 'Offline Edge', '#34d399'),
    ('Model Architecture', 'TFLite (INT8)', '#38bdf8'),
    ('Core Modules', '5+ Mobile Tools', '#fbbf24'),
    ('Research Status', 'IEEE Published', '#c084fc'),
]

for i, (lbl, val, col) in enumerate(pashu_kpis):
    draw_kpi(d_pashu, card_x, card_y, i, lbl, val, col, bg='#152e27', border='#1e4237')

d_pashu.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#132b24', outline='#1e4237', width=1)
d_pashu.text((cx1 + 25, cy1 + 20), 'On-Device Quantized CNN Classification Matrix', fill='#34d399', font=font_badge)

classes = [
    ('Bovine Dermatitis (Lumpy Skin Disease)', 0.94, '#10b981'),
    ('Foot and Mouth Disease (FMD)', 0.88, '#38bdf8'),
    ('Brucellosis Respiratory Pathology', 0.82, '#fbbf24'),
    ('Healthy Baseline Specimen', 0.96, '#34d399'),
]
for idx, (cls_name, conf, b_col) in enumerate(classes):
    by = cy1 + 60 + idx * 44
    d_pashu.text((cx1 + 25, by), cls_name, fill='#cbd5e1', font=font_small)
    d_pashu.rounded_rectangle([cx1 + 380, by + 4, cx1 + 530, by + 18], radius=6, fill='#1c3d33')
    d_pashu.rounded_rectangle([cx1 + 380, by + 4, cx1 + 380 + int(150 * conf), by + 18], radius=6, fill=b_col)
    d_pashu.text((cx1 + 535, by), f'{int(conf*100)}%', fill=b_col, font=font_small)

d_pashu.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#132b24', outline='#1e4237', width=1)
d_pashu.text((cx2 + 25, cy2 + 20), 'Offline-First Edge Pipeline', fill='#38bdf8', font=font_badge)

features_pashu = [
    ('Sub-120ms On-Device CNN Inference', '#34d399'),
    ('Zero Internet Required for Diagnosis', '#fbbf24'),
    ('Local SQLite + Redis Background Sync', '#38bdf8'),
    ('Presented at IEEE OTCON 2025', '#c084fc'),
]
for idx, (feat, f_col) in enumerate(features_pashu):
    d_pashu.text((cx2 + 25, cy2 + 65 + idx * 42), feat, fill=f_col, font=font_small)

save_dual(im_pashu, 'pashurakshak')


# ══════════════════════════════════════════════════════════════════
# 3. ELECTROPATHY AI BANNER
# ══════════════════════════════════════════════════════════════════
im_elec = Image.new('RGB', (W, H), color='#090d20')
d_elec = ImageDraw.Draw(im_elec)

for y in range(H):
    ratio = y / H
    r = int(9 + 18 * ratio)
    g = int(13 + 22 * ratio)
    b = int(32 + 45 * ratio)
    d_elec.line([(0, y), (W, y)], fill=(r, g, b))

# Badge
d_elec.rounded_rectangle([70, 50, 480, 92], radius=21, fill='#1e1b4b', outline='#6366f1', width=2)
d_elec.text((95, 60), 'AGENTIC RAG & CLINICAL DECISION SUPPORT', fill='#a5b4fc', font=font_badge)

# Title & Subtitle
d_elec.text((70, 110), 'Electropathy AI Clinical Engine', fill='#ffffff', font=font_title)
d_elec.text((70, 168), 'Multilingual RAG Copilot, pgvector Semantic Engine & Clinical Intake System', fill='#94a3b8', font=font_subtitle)

d_elec.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#111836', outline='#253066', width=2)

elec_kpis = [
    ('Knowledge Engine', 'Hybrid RAG', '#818cf8'),
    ('Vector Storage', 'pgvector DB', '#38bdf8'),
    ('Multilingual NLP', 'EN | HI | MR', '#34d399'),
    ('Client Portal', 'Live Production', '#f43f5e'),
]

for i, (lbl, val, col) in enumerate(elec_kpis):
    draw_kpi(d_elec, card_x, card_y, i, lbl, val, col, bg='#1a2452', border='#2d3c80')

d_elec.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#17204a', outline='#283570', width=1)
d_elec.text((cx1 + 25, cy1 + 20), 'Clinical Diagnostic Wizard & Constitutional Mapping', fill='#a5b4fc', font=font_badge)

steps = [
    ('Step 1: Patient History & Vitals Intake', 'Mobile OTP + Secure Supabase DB', '#38bdf8'),
    ('Step 2: Chief Complaints & Symptoms Matrix', 'Electropathy Constitution (Lymphatic/Sanguine)', '#818cf8'),
    ('Step 3: RAG Decision Support & Remedy Matching', 'Zero-Hallucination Retrieval Grounding', '#34d399'),
    ('Step 4: Clinical Prescription Generation', 'Exportable Dosage Schedule in English/Hindi/Marathi', '#f43f5e'),
]
for idx, (st_title, st_sub, s_col) in enumerate(steps):
    sy = cy1 + 55 + idx * 46
    d_elec.rounded_rectangle([cx1 + 25, sy, cx1 + 35, sy + 34], radius=3, fill=s_col)
    d_elec.text((cx1 + 45, sy), st_title, fill='#ffffff', font=font_small)
    d_elec.text((cx1 + 45, sy + 18), st_sub, fill='#94a3b8', font=font_small)

d_elec.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#17204a', outline='#283570', width=1)
d_elec.text((cx2 + 25, cy2 + 20), 'RAG Multilingual Assistant', fill='#38bdf8', font=font_badge)

features_elec = [
    ('Built for Dr. Ashish Wandhare', '#818cf8'),
    ('Prisma ORM on Supabase PostgreSQL', '#38bdf8'),
    ('Context-Aware Multilingual Embeddings', '#34d399'),
    ('Verified Materia Medica RAG Pipeline', '#fbbf24'),
]
for idx, (feat, f_col) in enumerate(features_elec):
    d_elec.text((cx2 + 25, cy2 + 65 + idx * 42), feat, fill=f_col, font=font_small)

save_dual(im_elec, 'electropathy_banner')
