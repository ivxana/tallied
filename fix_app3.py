import re

with open("src/App.js", "r") as f:
    content = f.read()

print(f"File loaded: {len(content)} chars")

# ── FIX 1: All remaining dark blues to lighter #7EB3FF ───────────────────────
content = content.replace('"#6B9FFF"', '"#7EB3FF"')
content = content.replace("'#6B9FFF'", "'#7EB3FF'")
content = content.replace('"#4F7CFF"', '"#7EB3FF"')
content = content.replace("'#4F7CFF'", "'#7EB3FF'")
# The dark blue button on summary page - bg-blue-600 class
content = content.replace("'bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all mb-3'", "'text-white transition-all mb-3'")
content = content.replace("className=\"w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all mb-3\"", "className=\"w-full py-4 rounded-xl font-semibold text-lg text-white transition-all mb-3\" style={{ background: '#7EB3FF' }}")
content = content.replace("className=\"w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all\"", "className=\"w-full py-4 rounded-xl font-semibold text-lg text-white transition-all\" style={{ background: '#7EB3FF' }}")
content = content.replace("className=\"w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all mb-3\"", "className=\"w-full py-4 rounded-xl font-semibold text-lg text-white transition-all mb-3\" style={{ background: '#7EB3FF' }}")
# Chat send button
content = content.replace("'bg-blue-600 text-white hover:bg-blue-700'", "'text-white'")
# Mode switcher active
content = content.replace("'bg-blue-600 text-white border-blue-600'", "'text-white border-transparent'")
content = content.replace("bg-blue-600 text-white border-blue-600", "text-white")
print("Blue colors unified")

# ── FIX 2: Inject CSS animations + hover styles globally ─────────────────────
# Find the useEffect that injects fonts and add animations there
old_style_inject = "    style.textContent = '@keyframes fadeUp"
if old_style_inject in content:
    print("Animations already injected - updating")
    # Replace existing animation injection
    anim_pattern = re.compile(r"style\.textContent = '@keyframes fadeUp[^']*';", re.DOTALL)
    new_anim = (
        "style.textContent = '"
        "@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } "
        "@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } "
        "@keyframes popIn { 0% { transform: scale(0.95); } 60% { transform: scale(1.02); } 100% { transform: scale(1); } } "
        ".tl-fade { animation: fadeUp 0.5s ease both; } "
        ".tl-fade-1 { animation: fadeUp 0.5s ease 0.1s both; } "
        ".tl-fade-2 { animation: fadeUp 0.5s ease 0.2s both; } "
        ".tl-fade-3 { animation: fadeUp 0.5s ease 0.3s both; } "
        ".tl-fade-4 { animation: fadeUp 0.5s ease 0.4s both; } "
        ".tl-fade-5 { animation: fadeUp 0.5s ease 0.5s both; } "
        ".tl-card:hover { border-color: #7EB3FF !important; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(126,179,255,0.18) !important; background: #FAFCFF !important; } "
        ".tl-card { transition: all 0.2s ease; } "
        ".tl-btn:hover { transform: translateY(-1px); opacity: 0.92; } "
        ".tl-btn { transition: all 0.15s ease; } "
        "'"
    )
    content = anim_pattern.sub(new_anim, content)
else:
    # Inject fresh
    old_effect = "  React.useEffect(() => {\n    const link = document.createElement('link');"
    new_effect = (
        "  React.useEffect(() => {\n"
        "    const style = document.createElement('style');\n"
        "    style.textContent = '"
        "@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } "
        "@keyframes popIn { 0% { transform: scale(0.95); } 60% { transform: scale(1.02); } 100% { transform: scale(1); } } "
        ".tl-fade { animation: fadeUp 0.5s ease both; } "
        ".tl-fade-1 { animation: fadeUp 0.5s ease 0.1s both; } "
        ".tl-fade-2 { animation: fadeUp 0.5s ease 0.2s both; } "
        ".tl-fade-3 { animation: fadeUp 0.5s ease 0.3s both; } "
        ".tl-fade-4 { animation: fadeUp 0.5s ease 0.4s both; } "
        ".tl-fade-5 { animation: fadeUp 0.5s ease 0.5s both; } "
        ".tl-card:hover { border-color: #7EB3FF !important; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(126,179,255,0.18) !important; background: #FAFCFF !important; } "
        ".tl-card { transition: all 0.2s ease; } "
        ".tl-btn:hover { transform: translateY(-1px); opacity: 0.92; } "
        ".tl-btn { transition: all 0.15s ease; } "
        "';\n"
        "    document.head.appendChild(style);\n"
        "    const link = document.createElement('link');"
    )
    content = content.replace(old_effect, new_effect)
print("Animations injected")

# ── FIX 3: Add tl-card class to PolicyCard ───────────────────────────────────
# Find the PolicyCard div and add className
old_policy_card_div = "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '0.5px solid #EEEEEE', overflow: 'hidden' }}"
new_policy_card_div = "className=\"tl-card\" style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE', overflow: 'hidden' }}"
content = content.replace(old_policy_card_div, new_policy_card_div)

# Also catch variant without boxShadow
old_policy_card_div2 = "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE', overflow: 'hidden', transition: 'all 0.2s ease' }}"
new_policy_card_div2 = "className=\"tl-card\" style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE', overflow: 'hidden' }}"
content = content.replace(old_policy_card_div2, new_policy_card_div2)

# Remove any old manual onMouseEnter/Leave handlers since CSS class handles it now
content = re.sub(
    r' onMouseEnter=\{e => \{[^}]+\}[^}]+\}\} onMouseLeave=\{e => \{[^}]+\}[^}]+\}\}',
    '',
    content
)
print("PolicyCard hover class added")

# ── FIX 4: Add tl-fade animations to landing page elements ───────────────────
# Hero section
content = content.replace(
    '<div style={{ display: \'flex\', alignItems: \'center\', gap: \'14px\', marginBottom: \'8px\' }}>',
    '<div className="tl-fade" style={{ display: \'flex\', alignItems: \'center\', gap: \'14px\', marginBottom: \'8px\' }}>'
)
# Tagline
content = content.replace(
    '<p style={{ fontFamily: "\'Lora\', Georgia, serif", fontSize: \'15px\', color: \'#7EB3FF\', fontWeight: 500, fontStyle: \'italic\', marginBottom: \'20px\', marginLeft: \'70px\' }}>',
    '<p className="tl-fade-1" style={{ fontFamily: "\'Lora\', Georgia, serif", fontSize: \'15px\', color: \'#7EB3FF\', fontWeight: 500, fontStyle: \'italic\', marginBottom: \'20px\', marginLeft: \'70px\' }}>'
)
# Pills
content = content.replace(
    '<div style={{ display: \'flex\', gap: \'8px\', marginBottom: \'20px\', flexWrap: \'wrap\' }}>',
    '<div className="tl-fade-2" style={{ display: \'flex\', gap: \'8px\', marginBottom: \'20px\', flexWrap: \'wrap\' }}>'
)
# Stat card
content = content.replace(
    '<div style={{ background: \'#F2F7FF\', borderRadius: \'16px\', padding: \'20px 22px\', marginBottom: \'12px\', display: \'flex\', gap: \'18px\', alignItems: \'flex-start\', border: \'0.5px solid #D0E8FF\' }}>',
    '<div className="tl-fade-3" style={{ background: \'#F2F7FF\', borderRadius: \'16px\', padding: \'20px 22px\', marginBottom: \'12px\', display: \'flex\', gap: \'18px\', alignItems: \'flex-start\', border: \'0.5px solid #D0E8FF\' }}>'
)
# Scope box
content = content.replace(
    '<div style={{ background: \'#F2F7FF\', borderRadius: \'12px\', padding: \'10px 16px\', marginBottom: \'20px\', border: \'0.5px solid #D0E8FF\' }}>',
    '<div className="tl-fade-4" style={{ background: \'#F2F7FF\', borderRadius: \'12px\', padding: \'10px 16px\', marginBottom: \'20px\', border: \'0.5px solid #D0E8FF\' }}>'
)
print("Landing animations added")

# ── FIX 5: Add tl-btn to main CTA buttons ────────────────────────────────────
content = content.replace(
    'style={{ width: \'100%\', background: \'#7EB3FF\', color: \'white\', borderRadius: \'14px\', padding: \'16px\', fontFamily: "\'Lora\', Georgia, serif", fontSize: \'15px\', fontWeight: 500, border: \'none\', cursor: \'pointer\', marginBottom: \'10px\' }}',
    'className="tl-btn tl-fade-5" style={{ width: \'100%\', background: \'#7EB3FF\', color: \'white\', borderRadius: \'14px\', padding: \'16px\', fontFamily: "\'Lora\', Georgia, serif", fontSize: \'15px\', fontWeight: 500, border: \'none\', cursor: \'pointer\', marginBottom: \'10px\' }}'
)
print("CTA button animations added")

# ── FIX 6: Fix issue card hover - add tl-ic class with rose on selected ───────
# Replace the issue card button style to include className
old_ic_btn = (
    "                  style={{\n"
    "                    padding: '14px', borderRadius: '14px', textAlign: 'left',\n"
    "                    border: isSelected ? '1.5px solid #F4A0B0' : '0.5px solid #E8E8E8',\n"
    "                    background: isSelected ? '#FFF0F3' : isDisabled ? '#FAFAFA' : 'white',\n"
    "                    cursor: isDisabled ? 'not-allowed' : 'pointer',\n"
    "                    transition: 'all 0.2s ease', fontFamily: \"'Lora', Georgia, serif\",\n"
    "                  }}"
)
new_ic_btn = (
    "                  className={isSelected ? 'tl-ic-sel' : isDisabled ? '' : 'tl-ic'}\n"
    "                  style={{\n"
    "                    padding: '14px', borderRadius: '14px', textAlign: 'left',\n"
    "                    border: isSelected ? '1.5px solid #F4A0B0' : '0.5px solid #E8E8E8',\n"
    "                    background: isSelected ? '#FFF0F3' : isDisabled ? '#FAFAFA' : 'white',\n"
    "                    cursor: isDisabled ? 'not-allowed' : 'pointer',\n"
    "                    transition: 'all 0.2s ease', fontFamily: \"'Lora', Georgia, serif\",\n"
    "                  }}"
)
content = content.replace(old_ic_btn, new_ic_btn)

# Add tl-ic and tl-ic-sel hover styles to the animation injection
content = content.replace(
    ".tl-btn { transition: all 0.15s ease; } '",
    ".tl-btn { transition: all 0.15s ease; } .tl-ic { transition: all 0.2s ease; } .tl-ic:hover { border-color: #7EB3FF !important; background: #F2F7FF !important; transform: translateY(-2px); box-shadow: 0 4px 14px rgba(126,179,255,0.15); } .tl-ic-sel { transition: all 0.2s ease; animation: popIn 0.25s ease; } .tl-ic-sel:hover { background: #FFE4EA !important; transform: translateY(-2px); box-shadow: 0 4px 14px rgba(192,57,90,0.12); } '"
)
print("Issue card hover added")

with open("src/App.js", "w") as f:
    f.write(content)

print(f"\nAll done! File saved: {len(content)} chars")
