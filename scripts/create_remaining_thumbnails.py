import os
from PIL import Image, ImageDraw, ImageFont

output_dir = 'frontend/src/photo'
os.makedirs(output_dir, exist_ok=True)

try:
    font_title = ImageFont.truetype('segoeuib.ttf', 44)
    font_subtitle = ImageFont.truetype('segoeui.ttf', 22)
    font_bold = ImageFont.truetype('segoeuib.ttf', 28)
    font_kpi_val = ImageFont.truetype('segoeuib.ttf', 30)
    font_kpi_val_small = ImageFont.truetype('segoeuib.ttf', 23)
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
# 1. CITYWIDE CAMERA SURVEILLANCE
# ══════════════════════════════════════════════════════════════════
im_city = Image.new('RGB', (W, H), color='#090d16')
d_city = ImageDraw.Draw(im_city)

for y in range(H):
    ratio = y / H
    r = int(9 + 12 * ratio)
    g = int(13 + 18 * ratio)
    b = int(22 + 28 * ratio)
    d_city.line([(0, y), (W, y)], fill=(r, g, b))

d_city.rounded_rectangle([70, 50, 410, 92], radius=21, fill='#082f49', outline='#0284c7', width=2)
d_city.text((95, 60), 'COMPUTER VISION & SMART CITY', fill='#38bdf8', font=font_badge)

d_city.text((70, 110), 'Citywide Camera Surveillance System', fill='#ffffff', font=font_title)
d_city.text((70, 168), 'Distributed Urban Video Streams, Neural Object Tracking & Incident Detection', fill='#94a3b8', font=font_subtitle)

card_x, card_y, card_w, card_h = 70, 220, 1060, 470
d_city.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#0b1120', outline='#1e293b', width=2)

city_kpis = [
    ('Surveillance Nodes', '100+ Feeds', '#38bdf8'),
    ('Inference Latency', '< 45ms YOLO', '#4ade80'),
    ('Detection Matrix', 'Multi-Class Vision', '#facc15'),
    ('Network Uptime', '99.9% Monitored', '#f43f5e'),
]

for i, (lbl, val, col) in enumerate(city_kpis):
    draw_kpi(d_city, card_x, card_y, i, lbl, val, col, bg='#111d33', border='#1e3a5f')

# Left Panel: Vision Detection Matrix
cx1, cy1, cw1, ch1 = card_x + 35, card_y + 180, 500, 250
d_city.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#111d33', outline='#1e3a5f', width=1)
d_city.text((cx1 + 25, cy1 + 20), 'Neural Object Tracking & Spatial Heatmap', fill='#cbd5e1', font=font_badge)

classes = [
    ('Vehicle Density & Traffic Velocity', '98%', '#38bdf8'),
    ('Pedestrian Flow & Crowd Telemetry', '95%', '#4ade80'),
    ('Zone Intrusion & Perimeter Breach', '91%', '#fbbf24'),
    ('Automated Incident Alert Webhooks', '100%', '#f43f5e'),
]

for j, (name, pct, col) in enumerate(classes):
    yy = cy1 + 65 + j * 42
    d_city.text((cx1 + 25, yy), name, fill='#e2e8f0', font=font_small)
    bar_x = cx1 + 330
    d_city.rounded_rectangle([bar_x, yy + 3, bar_x + 100, yy + 15], radius=6, fill='#1e293b')
    fill_w = int(100 * (int(pct.replace('%', '')) / 100))
    d_city.rounded_rectangle([bar_x, yy + 3, bar_x + fill_w, yy + 15], radius=6, fill=col)
    d_city.text((bar_x + 112, yy), pct, fill=col, font=font_small)

# Right Panel: Architecture Highlights
cx2, cy2, cw2, ch2 = card_x + 560, card_y + 180, 465, 250
d_city.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#111d33', outline='#1e3a5f', width=1)
d_city.text((cx2 + 25, cy2 + 20), 'Distributed Edge Video Pipeline', fill='#7dd3fc', font=font_badge)

city_specs = [
    ('Real-time HLS/RTSP Multi-Stream Ingestion', '#38bdf8'),
    ('Indexed PostGIS Spatio-Temporal Queries', '#4ade80'),
    ('Sub-15ms Spatial Proximity Indexing', '#facc15'),
    ('Automated Dispatch Alerts via Webhooks', '#fb7185'),
    ('Built with TypeScript, Node.js & PostgreSQL', '#cbd5e1'),
]

for k, (spec, col) in enumerate(city_specs):
    yy = cy2 + 65 + k * 34
    d_city.rectangle([cx2 + 25, yy + 3, cx2 + 33, yy + 15], fill=col)
    d_city.text((cx2 + 42, yy), spec, fill='#cbd5e1', font=font_small)

save_dual(im_city, 'citywide_surveillance')

# ══════════════════════════════════════════════════════════════════
# 2. TRULIACARE TELEHEALTH & AUTOMATED ESCALATION PLATFORM
# ══════════════════════════════════════════════════════════════════
im_trulia = Image.new('RGB', (W, H), color='#041517')
d_trulia = ImageDraw.Draw(im_trulia)

for y in range(H):
    ratio = y / H
    r = int(4 + 10 * ratio)
    g = int(21 + 22 * ratio)
    b = int(23 + 28 * ratio)
    d_trulia.line([(0, y), (W, y)], fill=(r, g, b))

d_trulia.rounded_rectangle([70, 50, 430, 92], radius=21, fill='#064e3b', outline='#10b981', width=2)
d_trulia.text((95, 60), 'HEALTHCARE SLA & AUTOMATED ESCALATION', fill='#34d399', font=font_badge)

d_trulia.text((70, 110), 'TruliaCare: Healthcare & SLA Escalation Engine', fill='#ffffff', font=font_title)
d_trulia.text((70, 168), 'Dual-Tier SLA Escalation Engine, Background Cron Breach Guards & Real-Time Telehealth Triage', fill='#94a3b8', font=font_subtitle)

d_trulia.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#061d20', outline='#114b4f', width=2)

trulia_kpis = [
    ('Escalation Engine', 'Automated SLA Cron', '#2dd4bf'),
    ('Time-to-Accept', '< 60s Acceptance', '#38bdf8'),
    ('Atomic Breach Guard', 'Prisma $transaction', '#facc15'),
    ('Resolution SLAs', 'Critical / High / Med', '#f43f5e'),
]

for i, (lbl, val, col) in enumerate(trulia_kpis):
    draw_kpi(d_trulia, card_x, card_y, i, lbl, val, col, bg='#0b2c30', border='#165b61')

# Left Panel: Dual-Tier SLA Escalation Matrix
cx1, cy1, cw1, ch1 = card_x + 35, card_y + 180, 500, 250
d_trulia.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#0b2c30', outline='#165b61', width=1)
d_trulia.text((cx1 + 25, cy1 + 20), 'Dual-Tier SLA Escalation & Breach Matrix', fill='#cbd5e1', font=font_badge)

steps = [
    ('Pending Request Acceptance SLA (60s Threshold)', 'Auto-Escalate', '#f87171'),
    ('Critical Priority Resolution SLA (15s Target)', 'Breach Alert', '#fb923c'),
    ('High Priority Resolution SLA (30s Target)', 'Monitored', '#facc15'),
    ('Medium / Low Resolution SLA (60s - 120s Target)', 'Tracking', '#4ade80'),
]

for j, (name, status, col) in enumerate(steps):
    yy = cy1 + 65 + j * 42
    d_trulia.text((cx1 + 25, yy), name, fill='#e2e8f0', font=font_small)
    d_trulia.rounded_rectangle([cx1 + 375, yy - 2, cx1 + 475, yy + 20], radius=6, fill='#114b4f')
    d_trulia.text((cx1 + 382, yy + 1), status, fill=col, font=font_small)

# Right Panel: Architecture & Incident Dispatch
cx2, cy2, cw2, ch2 = card_x + 560, card_y + 180, 465, 250
d_trulia.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#0b2c30', outline='#165b61', width=1)
d_trulia.text((cx2 + 25, cy2 + 20), 'Escalation Architecture & Incident Dispatch', fill='#5eead4', font=font_badge)

trulia_specs = [
    ('Atomic Status Update via tx.updateMany Concurrency Guard', '#2dd4bf'),
    ('Structured Audit Trail via tx.escalationLog.create', '#38bdf8'),
    ('Multi-Channel Dispatch: Automated Email & Push Alerts', '#facc15'),
    ('Live Frontend SlaTimer Countdown & Timeline Trace Modal', '#4ade80'),
    ('Cross-Platform Mobile Client in React Native (Expo)', '#fed7aa'),
]

for k, (spec, col) in enumerate(trulia_specs):
    yy = cy2 + 65 + k * 34
    d_trulia.rectangle([cx2 + 25, yy + 3, cx2 + 33, yy + 15], fill=col)
    d_trulia.text((cx2 + 42, yy), spec, fill='#cbd5e1', font=font_small)

save_dual(im_trulia, 'truliacare_telehealth')

# ══════════════════════════════════════════════════════════════════
# 3. FARMER ALTERNATIVE CREDIT SCORING
# ══════════════════════════════════════════════════════════════════
im_farmer = Image.new('RGB', (W, H), color='#09150f')
d_farmer = ImageDraw.Draw(im_farmer)

for y in range(H):
    ratio = y / H
    r = int(9 + 12 * ratio)
    g = int(21 + 24 * ratio)
    b = int(15 + 18 * ratio)
    d_farmer.line([(0, y), (W, y)], fill=(r, g, b))

d_farmer.rounded_rectangle([70, 50, 420, 92], radius=21, fill='#14532d', outline='#22c55e', width=2)
d_farmer.text((95, 60), 'FINTECH & AGRICULTURAL INCLUSION', fill='#86efac', font=font_badge)

d_farmer.text((70, 110), 'Farmer Alternative Credit Scoring', fill='#ffffff', font=font_title)
d_farmer.text((70, 168), 'Algorithmic Risk Profiling & Seasonal Yield Metrics for Credit Invisibility', fill='#94a3b8', font=font_subtitle)

d_farmer.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=24, fill='#0d2117', outline='#1c4230', width=2)

farmer_kpis = [
    ('Target Cohort', 'Unbanked Farmers', '#4ade80'),
    ('Scoring Engine', 'Seasonal Yield ML', '#38bdf8'),
    ('Underwriting', 'Multi-Variable', '#facc15'),
    ('Invisibility Gap', '0 to Prime Score', '#fb7185'),
]

for i, (lbl, val, col) in enumerate(farmer_kpis):
    draw_kpi(d_farmer, card_x, card_y, i, lbl, val, col, bg='#132d20', border='#1f4f37')

# Left Panel: Scoring Trajectory
cx1, cy1, cw1, ch1 = card_x + 35, card_y + 180, 500, 250
d_farmer.rounded_rectangle([cx1, cy1, cx1 + cw1, cy1 + ch1], radius=16, fill='#132d20', outline='#1f4f37', width=1)
d_farmer.text((cx1 + 25, cy1 + 20), 'Agricultural Credit Risk Stratification', fill='#cbd5e1', font=font_badge)

tiers = [
    ('Tier A: Prime Agricultural Eligibility (750+)', 'High Yield', '#4ade80'),
    ('Tier B: Seasonal Verified Micro-Credit (650-749)', 'Approved', '#38bdf8'),
    ('Tier C: Assisted Agrarian Credit (550-649)', 'Supported', '#facc15'),
    ('Zero Credit History Baseline', 'Graduated', '#a3e635'),
]

for j, (name, status, col) in enumerate(tiers):
    yy = cy1 + 65 + j * 42
    d_farmer.text((cx1 + 25, yy), name, fill='#e2e8f0', font=font_small)
    d_farmer.rounded_rectangle([cx1 + 375, yy - 2, cx1 + 475, yy + 20], radius=6, fill='#1a3d2b')
    d_farmer.text((cx1 + 385, yy + 1), status, fill=col, font=font_small)

# Right Panel: Data Inputs
cx2, cy2, cw2, ch2 = card_x + 560, card_y + 180, 465, 250
d_farmer.rounded_rectangle([cx2, cy2, cx2 + cw2, cy2 + ch2], radius=16, fill='#132d20', outline='#1f4f37', width=1)
d_farmer.text((cx2 + 25, cy2 + 20), 'Alternative Underwriting Data Pipeline', fill='#86efac', font=font_badge)

farmer_specs = [
    ('Satellite Vegetation Index (NDVI) Historical Telemetry', '#4ade80'),
    ('Rainfall & Soil Health Multi-Year Aggregations', '#38bdf8'),
    ('Localized Mandi & Crop Price Market Indices', '#facc15'),
    ('Community Repayment Micro-Lending Networks', '#a3e635'),
    ('Built with TypeScript & Predictive Modeling', '#cbd5e1'),
]

for k, (spec, col) in enumerate(farmer_specs):
    yy = cy2 + 65 + k * 34
    d_farmer.rectangle([cx2 + 25, yy + 3, cx2 + 33, yy + 15], fill=col)
    d_farmer.text((cx2 + 42, yy), spec, fill='#cbd5e1', font=font_small)

save_dual(im_farmer, 'farmer_credit')
print('All remaining flagship thumbnails created successfully!')
