#!/usr/bin/env python3
import os
import json

def assemble():
    print("Reading base teambud-app.html...")
    with open('public/assets/aistudio/teambud-app_7ed5b051.html', 'r', encoding='utf-8') as f:
        orig = f.read()

    # Read extra CSS
    from build_app import get_extra_css
    extra_css = get_extra_css()

    style_close = orig.find('</style>')
    if style_close == -1:
        raise ValueError("Cannot find </style>")

    html_part1 = orig[:style_close] + extra_css + orig[style_close:]

    # Add modal-container to body
    html_part1 = html_part1.replace('<div id="root"></div>', '<div id="root"></div>\n<div id="modal-container"></div>', 1)

    # Locate second <script> (after the logos script)
    # The first script has base64 logos: <script>\n(function(){var L={...
    # The second script is <script>\n"use strict";
    script2_marker = '<script>\n"use strict";'
    pos2 = html_part1.find(script2_marker)
    if pos2 == -1:
        # try without newline
        pos2 = html_part1.find('<script>"use strict";')
    if pos2 == -1:
        # find the second <script> tag
        first_script = html_part1.find('<script>')
        second_script = html_part1.find('<script>', first_script + 8)
        pos2 = second_script

    if pos2 == -1:
        raise ValueError("Could not find second script tag")

    head_to_second_script = html_part1[:pos2 + len('<script>\n')]

    import base64
    with open('public/sulaiman-thumb.jpg', 'rb') as f:
        b64_thumb = base64.b64encode(f.read()).decode('utf-8')
    with open('public/sulaiman-web.jpg', 'rb') as f:
        b64_web = base64.b64encode(f.read()).decode('utf-8')

    # Read app_code.js
    with open('scripts/app_code.js', 'r', encoding='utf-8') as f:
        js_code = f.read()

    js_code = js_code.replace('/* __SULAIMAN_PHOTO__ */', f'window.__SULAIMAN_PHOTO = "data:image/jpeg;base64,{b64_thumb}";')

    final_app_html = head_to_second_script + js_code + "\n</script>\n</body>\n</html>"

    print("Writing updated teambud-app.html...")
    with open('public/teambud-app.html', 'w', encoding='utf-8') as f:
        f.write(final_app_html)

    with open('teambud-app.html', 'w', encoding='utf-8') as f:
        f.write(final_app_html)

    # Also update teambud-home.html & index.html to dynamically load active agencies!
    print("Reading teambud-home.html...")
    with open('public/assets/aistudio/teambud-home_4a652271.html', 'r', encoding='utf-8') as f:
        home = f.read()

    # Wire AGENCIES in home HTML to localStorage if available
    target_wire = 'var AGENCIES = [];        /* [{name, logo, description, categories[], members, institution, verified, available, portfolio[], slug}] */'
    wire_code = """var AGENCIES = [];
try {
  var _raw = localStorage.getItem('teambud_prototype_v1');
  if (_raw) {
    var _db = JSON.parse(_raw);
    if (_db && _db.agencies && _db.agencies.length) {
      AGENCIES = _db.agencies.filter(function(a){ return a.status === 'active'; }).map(function(a){
        return {
          name: a.name,
          logo: a.logo || '',
          description: a.shortDesc || a.fullDesc || '',
          categories: [a.mainCategory].concat(a.additionalServices || []).filter(Boolean),
          members: (a.members || []).length,
          institution: a.institution || '',
          verified: true,
          available: a.availability !== 'unavailable',
          portfolio: a.portfolio || [],
          slug: a.slug
        };
      });
    }
  }
} catch(e) {}
"""
    if target_wire in home:
        home = home.replace(target_wire, wire_code, 1)

    # Also update agency card buttons in home to point to teambud-app.html#/agency/
    home = home.replace('href="/agency/\'+esc(a.slug)+\'"', 'href="teambud-app.html#/agency/\'+esc(a.slug)+\'"')
    home = home.replace('href="/agency/\'+esc(a.slug)+\'/quote"', 'href="teambud-app.html#/agency/\'+esc(a.slug)+\'"')

    # Wire opportunities & Talent Hub in home navigation
    home = home.replace('<li><a href="#opportunities">Opportunities</a></li>', '<li><a href="teambud-app.html#/opportunities">Opportunities</a></li>')
    home = home.replace('<a class="link" href="#opportunities">Opportunities</a>', '<a class="link" href="teambud-app.html#/opportunities">Opportunities</a>')
    
    # Add Talent Hub between Home and How It Works
    home = home.replace('<li><a href="#home" aria-current="page">Home</a></li>\n          <li><a href="#how">How It Works</a></li>', '<li><a href="#home" aria-current="page">Home</a></li>\n          <li><a href="teambud-app.html#/talent">Talent Hub</a></li>\n          <li><a href="#how">How It Works</a></li>')
    home = home.replace('<li><a href="#home" aria-current="page">Home</a></li>\n        <li><a href="#how">How It Works</a></li>', '<li><a href="#home" aria-current="page">Home</a></li>\n        <li><a href="teambud-app.html#/talent">Talent Hub</a></li>\n        <li><a href="#how">How It Works</a></li>')
    home = home.replace('<a class="link" href="#home">Home</a>\n    <a class="link" href="#how">How It Works</a>', '<a class="link" href="#home">Home</a>\n    <a class="link" href="teambud-app.html#/talent">Talent Hub</a>\n    <a class="link" href="#how">How It Works</a>')
    home = home.replace('<li><a href="#about">About TeamBud</a></li>\n          <li><a href="#how">How It Works</a></li>', '<li><a href="#about">About TeamBud</a></li>\n          <li><a href="teambud-app.html#/talent">Talent Hub</a></li>\n          <li><a href="#how">How It Works</a></li>')
    
    home = home.replace('<a class="btn btn-ghost-light" href="teambud-app.html#/register/client">Submit a Project</a>', '<a class="btn btn-ghost-light" href="teambud-app.html#/talent">Explore Talent Hub ↗</a>\n        <a class="btn btn-ghost-light" href="teambud-app.html#/register/client">Submit a Project</a>\n        <a class="btn btn-ghost-light" href="teambud-app.html#/opportunities">Opportunities Centre ↗</a>')

    # Section 12: Add new Talent Showcase & Discovery Journey section before HOW IT WORKS
    showcase_section = """<!-- TALENT SHOWCASE & DISCOVERY JOURNEY -->
<section class="bg-sage" id="showcase" style="padding:72px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
  <div class="wrap">
    <div style="max-width:840px;margin:0 auto 36px;text-align:center">
      <span class="eyebrow" style="display:inline-block;margin-bottom:8px;font-size:.82rem;font-weight:700;color:var(--emerald);letter-spacing:.05em;text-transform:uppercase">Talent Discovery</span>
      <h2 style="font-size:2.2rem;font-weight:800;color:var(--forest);line-height:1.25;margin-bottom:14px">BEFORE YOU BUILD A TEAM, LET THE WORLD SEE WHAT YOU CAN DO.</h2>
      <p style="font-size:1.08rem;color:var(--forest);line-height:1.65;margin-bottom:12px;font-weight:600">You don't have to wait until you have an agency before people discover your abilities.</p>
      <p style="font-size:1rem;color:var(--muted);line-height:1.6">TeamBud gives you a place to showcase your skills, share your work, connect with other talented students and discover opportunities to collaborate. Whether you're still learning or already working on professional projects, your journey can start here.</p>
    </div>

    <!-- Feature Highlights -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:36px">
      <div style="background:var(--white);padding:22px 18px;border-radius:14px;border:1px solid var(--line);text-align:center">
        <div style="font-size:2rem;margin-bottom:8px">👤</div>
        <strong style="color:var(--forest);display:block;margin-bottom:4px;font-size:.95rem">Create Your Talent Profile</strong>
        <p style="font-size:.84rem;color:var(--muted);margin:0">Build a verified presence highlighting your capabilities.</p>
      </div>
      <div style="background:var(--white);padding:22px 18px;border-radius:14px;border:1px solid var(--line);text-align:center">
        <div style="font-size:2rem;margin-bottom:8px">📁</div>
        <strong style="color:var(--forest);display:block;margin-bottom:4px;font-size:.95rem">Showcase Your Portfolio</strong>
        <p style="font-size:.84rem;color:var(--muted);margin:0">Display projects, tools used, and proven work samples.</p>
      </div>
      <div style="background:var(--white);padding:22px 18px;border-radius:14px;border:1px solid var(--line);text-align:center">
        <div style="font-size:2rem;margin-bottom:8px">🔍</div>
        <strong style="color:var(--forest);display:block;margin-bottom:4px;font-size:.95rem">Discover Diverse Talents</strong>
        <p style="font-size:.84rem;color:var(--muted);margin:0">Find students with complementary and multidisciplinary skills.</p>
      </div>
      <div style="background:var(--white);padding:22px 18px;border-radius:14px;border:1px solid var(--line);text-align:center">
        <div style="font-size:2rem;margin-bottom:8px">🤝</div>
        <strong style="color:var(--forest);display:block;margin-bottom:4px;font-size:.95rem">Connect with Collaborators</strong>
        <p style="font-size:.84rem;color:var(--muted);margin:0">Send intro notes and build trusted peer partnerships.</p>
      </div>
      <div style="background:var(--white);padding:22px 18px;border-radius:14px;border:1px solid var(--line);text-align:center">
        <div style="font-size:2rem;margin-bottom:8px">🚀</div>
        <strong style="color:var(--forest);display:block;margin-bottom:4px;font-size:.95rem">Find Opportunities</strong>
        <p style="font-size:.84rem;color:var(--muted);margin:0">Work together on client contracts, challenges, and startups.</p>
      </div>
    </div>

    <!-- Visual Representation of the Journey -->
    <div style="background:var(--white);border-radius:18px;border:1px solid var(--line);padding:28px 24px;margin-bottom:32px;box-shadow:0 4px 16px rgba(24,68,55,0.04)">
      <div style="text-align:center;font-size:.84rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:20px">The Collaborative Journey: From Individual Talent to Agency Enterprise</div>
      <div style="display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;gap:12px;text-align:center">
        <div style="flex:1;min-width:130px">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--sage);color:var(--emerald);font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px">1</div>
          <strong style="font-size:.92rem;color:var(--forest);display:block">Individual Talents</strong>
          <small style="color:var(--muted);font-size:.78rem">Showcase verified skills</small>
        </div>
        <div style="color:var(--emerald);font-weight:800;font-size:1.3rem">→</div>
        <div style="flex:1;min-width:130px">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--sage);color:var(--emerald);font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px">2</div>
          <strong style="font-size:.92rem;color:var(--forest);display:block">Connections</strong>
          <small style="color:var(--muted);font-size:.78rem">Find complementary peers</small>
        </div>
        <div style="color:var(--emerald);font-weight:800;font-size:1.3rem">→</div>
        <div style="flex:1;min-width:130px">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--sage);color:var(--emerald);font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px">3</div>
          <strong style="font-size:.92rem;color:var(--forest);display:block">Teams</strong>
          <small style="color:var(--muted);font-size:.78rem">Form 3 to 10 member units</small>
        </div>
        <div style="color:var(--emerald);font-weight:800;font-size:1.3rem">→</div>
        <div style="flex:1;min-width:130px">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--sage);color:var(--emerald);font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px">4</div>
          <strong style="font-size:.92rem;color:var(--forest);display:block">Agencies</strong>
          <small style="color:var(--muted);font-size:.78rem">Launch public agency brand</small>
        </div>
        <div style="color:var(--emerald);font-weight:800;font-size:1.3rem">→</div>
        <div style="flex:1;min-width:130px">
          <div style="width:46px;height:46px;border-radius:50%;background:var(--lime);color:var(--forest);font-weight:800;font-size:1.15rem;display:flex;align-items:center;justify-content:center;margin:0 auto 8px">5</div>
          <strong style="font-size:.92rem;color:var(--forest);display:block">Clients</strong>
          <small style="color:var(--muted);font-size:.78rem">Deliver real projects & earn</small>
        </div>
      </div>
    </div>

    <!-- CTAs -->
    <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap">
      <a class="btn btn-primary" href="teambud-app.html#/talent" style="padding:14px 28px;font-size:1rem">EXPLORE TALENT ↗</a>
      <a class="btn btn-ghost" href="teambud-app.html#/register" style="padding:14px 26px;font-size:1rem">CREATE YOUR TALENT PROFILE</a>
    </div>
  </div>
</section>
"""
    if '<!-- HOW IT WORKS -->' in home and 'id="showcase"' not in home:
        home = home.replace('<!-- HOW IT WORKS -->', showcase_section + '\n<!-- HOW IT WORKS -->')


    import base64
    with open('public/sulaiman-web.jpg', 'rb') as f:
        b64_web = base64.b64encode(f.read()).decode('utf-8')
    with open('public/sulaiman-thumb.jpg', 'rb') as f:
        b64_thumb = base64.b64encode(f.read()).decode('utf-8')

    # Replace founder placeholder with real portrait of Sulaiman (base64 embedded for 100% instant rendering)
    founder_placeholder = '<div class="frame"><img class="ph" data-logo="icon" alt=""></div>'
    founder_real = f'<div class="frame"><img src="data:image/jpeg;base64,{b64_web}" srcset="sulaiman.jpg 2x, sulaiman-web.jpg 1x" alt="Onifade Sulaiman Ipesola, founder of TeamBud" style="width:100%;height:100%;object-fit:cover;object-position:center 20%;display:block"></div>'
    home = home.replace(founder_placeholder, founder_real)

    # Also enhance the founder quote with the founder's avatar
    quote_cite = '<cite>Onifade Sulaiman Ipesola (Mr. Clarity), Founder</cite>'
    quote_with_avatar = f'<div style="display:flex;align-items:center;gap:12px;margin-top:14px"><img src="data:image/jpeg;base64,{b64_thumb}" alt="Onifade Sulaiman Ipesola" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid var(--lime);flex-shrink:0"><cite style="margin-top:0">Onifade Sulaiman Ipesola (Mr. Clarity), Founder</cite></div>'
    home = home.replace(quote_cite, quote_with_avatar)

    with open('public/teambud-home.html', 'w', encoding='utf-8') as f:
        f.write(home)

    with open('teambud-home.html', 'w', encoding='utf-8') as f:
        f.write(home)

    # Also update public/assets/aistudio/teambud-home_4a652271.html so it has the founder portrait if viewed directly
    with open('public/assets/aistudio/teambud-home_4a652271.html', 'w', encoding='utf-8') as f:
        f.write(home)

    # For index.html: include OpenGraph meta tags
    og_tags = """<meta property="og:title" content="TeamBud | Find Your People. Build Your Future.">
<meta property="og:description" content="TeamBud connects talented students with complementary skills so they can form teams, build agencies and work with real clients.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://teambud.vercel.app">
<link rel="canonical" href="https://teambud.vercel.app">
<meta name="twitter:card" content="summary_large_image">
"""
    index_html = home.replace('<meta name="description"', og_tags + '<meta name="description"')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)

    print("All files assembled successfully!")

if __name__ == '__main__':
    assemble()
