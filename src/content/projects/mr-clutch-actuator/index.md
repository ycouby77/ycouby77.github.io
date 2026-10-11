---
title: MR Clutch Actuator for a Robotic Hand
order: 1
featured: true
context: ARM Lab research
period: May 2026 - Present
disciplines: [Actuator design, Root-cause analysis, DFM]
summary: >-
  A miniaturized planetary-gear magnetorheological (MR) clutch that acts as the per-joint actuator in a
  fully actuated multi-finger robotic hand. MR fluid gives controllable, smooth torque transfer from a
  shared motor. The work builds on the squeeze-mode MR clutch concept introduced by Sergey Pisetskiy and
  Mehrdad R. Kermani at Western; I led the redesign that took it from a failing prototype toward fabrication.
objective: >-
  Fix a torsional shaft fracture and an unmanufacturable keyway without giving up torque, and get the
  clutch ready to fabricate.
tools: [SolidWorks, ISO 2768-m, Magnetic circuit reasoning, DFM, Vendor sourcing]
specs:
  - { label: Shaft, value: Ø1 → Ø2 mm }
  - { label: Coupling, value: Keyway → D-profile }
  - { label: Drawing std., value: ISO 2768-m }
  - { label: Parts redesigned, value: '7' }
results:
  - Both failure modes addressed with a single design change
  - All 7 parts sourced across five manufacturing platforms; quotes pending approval for order
  - Design moving to fabrication for the hand prototype
gallery:
  - { src: ./before.png, alt: Side view of the original clutch with a thin keyed shaft, label: Before, caption: 'Ø1 mm shaft, keyed coupling', matte: '#ffffff' }
  - { src: ./after.png, alt: Side view of the redesigned clutch with a thicker D-profile shaft, label: After, caption: 'Ø2 mm D-profile shaft, revised stator', matte: '#ffffff' }
  - { src: ./output-side.png, alt: Three-quarter view of the redesigned clutch output side, label: Redesign, caption: Output side, matte: '#ffffff' }
galleryNote: Exterior views only. Internal geometry is omitted because the lab's research is ongoing.
references:
  - title: A Concept of a Miniaturized MR Clutch Utilizing MR Fluid in Squeeze Mode
    authors: Sergey Pisetskiy and Mehrdad R. Kermani
    venue: IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)
    year: 2020
    url: https://doi.org/10.1109/IROS45743.2020.9341643
    note: Introduces a miniaturized MR clutch that uses a set of gears to work the MR fluid in squeeze mode, aimed at compact robotic joints such as gripper fingers. My redesign builds on this concept.
    image: ./output-side.png
---

- Traced the shaft fracture and the keyway problem to one shared stress-concentration root cause
- Upsized the shaft from 1 to 2 mm and implemented a D-profile shaft/bore coupling (recommended by a labmate) in place of the keyway
- Relocated the electromagnetic coil radially outward while keeping torque, since magnetomotive force *N·I* does not depend on coil radius, and kept the steel section that carries the flux
- Produced the 7-drawing manufacturing set under ISO 2768-m; caught a bearing-seat fit error in design review and re-specified the seat to +0.02/0 mm
- Sourced all 7 parts across five manufacturing platforms, vetting vendors on gear-cutting capability and material compatibility
