import re

with open("src/App.js", "r") as f:
    content = f.read()

# Fix 1: broken div with px-4 py-12
content = content.replace(
    'className="min-h-screen" style={{ background: '#FEFEFE' }} px-4 py-12">',
    'className="min-h-screen px-4 py-12" style={{ background: '#FEFEFE' }}>'
)

# Fix 2: broken div with flex flex-col
content = content.replace(
    'className="min-h-screen" style={{ background: '#FEFEFE' }} flex flex-col">',
    'className="min-h-screen flex flex-col" style={{ background: '#FEFEFE' }}>'
)

# Fix 3: Update TalliedLogo to dual-tone checkmark
old_logo = """const TalliedLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="7" fill="#F0F5FF"/>
    <rect x="7" y="9" width="26" height="23" rx="3" fill="white" stroke="#D8E6FF" strokeWidth="1.5"/>
    <line x1="12" y1="16" x2="28" y2="16" stroke="#E0E8FF" strokeWidth="1.5"/>
    <line x1="12" y1="21" x2="21" y2="21" stroke="#E0E8FF" strokeWidth="1.5"/>
    <polyline points="19,26 22,30 29,22" stroke="#6B9FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="31" cy="28" r="7" fill="#FFF0F3" stroke="#FFCDD6" strokeWidth="1"/>
    <polyline points="28,28 30.5,30.5 34.5,26" stroke="#C0395A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);"""

new_logo = """const TalliedLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <rect x="4" y="10" width="38" height="38" rx="5" fill="#6B9FFF"/>
    <polyline points="12,29 21,38 28,31" stroke="#4A7AE0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="21,38 48,8" stroke="#C0395A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);"""

if old_logo in content:
    content = content.replace(old_logo, new_logo)
    print("Logo updated")
else:
    print("Logo already updated or not found")

# Fix 4: Yellow disclaimer to rose
content = content.replace(
    'className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">',
    'style={{ background: "#FFF0F3", border: "0.5px solid #FFCDD6", borderRadius: "10px", padding: "9px 12px" }}>'
)
content = content.replace(
    'className="text-yellow-800 text-xs">',
    'style={{ fontFamily: "Lora, Georgia, serif", fontSize: "10px", color: "#8B2A40", lineHeight: 1.55, fontStyle: "italic" }}>'
)

# Fix 5: Blue signpost boxes - make sure they are blue not black
content = content.replace(
    "style={{ background: '#111', borderRadius: '14px'",
    "style={{ background: '#6B9FFF', borderRadius: '14px'"
)

# Fix 6: Signpost text color
content = content.replace(
    "color: '#AAA', lineHeight: 1.6, fontStyle: 'italic'",
    "color: '#D0E2FF', lineHeight: 1.6, fontStyle: 'italic'"
)

with open("src/App.js", "w") as f:
    f.write(content)

# Count remaining broken patterns
broken = content.count('className="min-h-screen" style={{ background:')
print(f"Fixed! Remaining broken patterns: {broken}")
print("Done - saved to src/App.js")
