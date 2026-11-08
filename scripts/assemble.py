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

    # Read app_code.js
    with open('scripts/app_code.js', 'r', encoding='utf-8') as f:
        js_code = f.read()

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

    with open('public/teambud-home.html', 'w', encoding='utf-8') as f:
        f.write(home)

    with open('teambud-home.html', 'w', encoding='utf-8') as f:
        f.write(home)

    # For index.html: include OpenGraph meta tags
    og_tags = """<meta property="og:title" content="TeamBud | Find Your People. Build Your Future.">
<meta property="og:description" content="TeamBud connects talented students with complementary skills so they can form teams, build agencies and work with real clients.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
"""
    index_html = home.replace('<meta name="description"', og_tags + '<meta name="description"')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)

    print("All files assembled successfully!")

if __name__ == '__main__':
    assemble()
