---
title: TTC Flood Rerouting Simulation
order: 4
featured: true
context: ES 1050 course project
period: Winter 2025, rebuilt 2026
disciplines: [Graph algorithms, GIS, Python]
summary: >-
  My first-year design project for ES 1050 at Western Engineering. The brief was to take on a problem
  related to flooding or fires and engineer a solution. Our team chose flooding in Toronto and built a
  simulation that reroutes TTC service around flooded streets. Try it below: click the map to flood an area.
objective: >-
  When a flood closes streets, show which stops and roads are lost and how a replacement shuttle should
  detour, so transit service can keep running.
tools: [Python, NetworkX, OSMnx, GeoPandas, TTC GTFS, TypeScript, Leaflet]
specs:
  - { label: Route, value: 504 King }
  - { label: Data, value: TTC GTFS + OpenStreetMap }
  - { label: Network, value: '1,916 intersections' }
  - { label: Routing, value: 'Dijkstra, one-way aware' }
results:
  - 'Example: a 200 m flood at King & Bathurst cuts 32 road segments, closes 1 stop, and adds 1.78 km to the shuttle route'
  - The browser version matches the Python simulator on the same scenario and recomputes in about 10 ms, so the map updates live
cover: { src: ./map-preview.svg, alt: 'Street map around King and Bathurst with the normal 504 route in grey, flooded roads in red, and the shuttle detour in orange looping north to Queen Street' }
simulation:
  src: /data/flood/route504.json
links:
  - { label: View the code on GitHub, href: 'https://github.com/ycouby77/ttc-flood-sim' }
---

**2025 prototype (team project).** We parsed the TTC's GTFS schedule data to get the stop sequence for the 504 King, pulled Toronto's road network from OpenStreetMap, removed roads near a flooded stop, and plotted the original and rerouted paths on an interactive map.

**2026 rebuild.** The prototype was rebuilt as a tested Python package and ported to the browser for this page:

- Roads are cut when their actual centreline enters the flood zone, not just when an endpoint does, so long blocks through the flood are caught
- The street network stays directed, so detours respect one-way streets
- Only the corridor around the route is downloaded and cached, instead of the whole city on every run
- Detours are measured in real distance and compared with the normal path over the same stops
- The most common daytime stop pattern is used, so overnight and short-turn variants don't distort the route
- The 504 is a streetcar, so detours are modelled as the replacement shuttle bus that would run on the roads
