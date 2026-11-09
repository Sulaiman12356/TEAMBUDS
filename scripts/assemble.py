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

    # Wire opportunities in home navigation
    home = home.replace('<li><a href="#opportunities">Opportunities</a></li>', '<li><a href="teambud-app.html#/opportunities">Opportunities</a></li>')
    home = home.replace('<a class="link" href="#opportunities">Opportunities</a>', '<a class="link" href="teambud-app.html#/opportunities">Opportunities</a>')
    home = home.replace('<a class="btn btn-ghost-light" href="teambud-app.html#/register/client">Submit a Project</a>', '<a class="btn btn-ghost-light" href="teambud-app.html#/register/client">Submit a Project</a>\n        <a class="btn btn-ghost-light" href="teambud-app.html#/opportunities">Opportunities Centre ↗</a>')

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
