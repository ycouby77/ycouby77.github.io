---
title: Off-Road RC Vehicle Platform
order: 3
featured: true
context: Personal build
period: Dec. 2025 - Apr. 2026
disciplines: [Mechanical design, Embedded systems, Prototyping]
summary: >-
  A fully custom off-road RC vehicle designed and built from scratch: chassis, drivetrain, steering,
  suspension, embedded control, and power system, all under strict size and budget limits with no kit
  or instructions.
objective: >-
  Design a durable, modular off-road platform inspired by military vehicle architecture, fabricating
  most parts from scratch.
tools: [SolidWorks, 3D printing, Arduino, Motor drivers, PWM control]
specs:
  - { label: Drivetrain, value: Modular FWD / 4WD }
  - { label: Control, value: Arduino + PWM }
  - { label: Fabrication, value: Mostly 3D-printed }
  - { label: Kit, value: None }
results:
  - Fully operational vehicle with custom chassis and drivetrain
  - Handles off-road terrain; electronics hold up under load
  - Modular design allows component swaps without a full rebuild
gallery:
  - { src: ./build.png, alt: The finished RC vehicle with red 3D-printed suspension arms and exposed electronics, label: Build, caption: Operational vehicle }
  - { src: ./cad.png, alt: SolidWorks assembly of the full vehicle chassis and suspension, label: CAD, caption: Full SolidWorks assembly }
viewer:
  title: Vehicle in 3D
  note: The full SolidWorks assembly plus the final printed parts, taken straight from the build files.
  models:
    - { label: Full assembly, src: /models/offroad-rc-vehicle/assembly.glb, finish: plastic, caption: 'Complete vehicle assembly: chassis, drivetrain, steering, suspension, and electronics.' }
    - { label: Front chassis, src: /models/offroad-rc-vehicle/front-chassis.stl, caption: Front half of the split chassis. }
    - { label: Rear chassis, src: /models/offroad-rc-vehicle/rear-chassis.stl, caption: Rear half of the split chassis. }
    - { label: Motor mount, src: /models/offroad-rc-vehicle/motor-mount.stl, caption: Motor mount. }
    - { label: Helical gear, src: /models/offroad-rc-vehicle/driven-helical-gear.stl, caption: Driven double-helical gear. }
    - { label: Drive coupler, src: /models/offroad-rc-vehicle/drive-coupler.stl, caption: Drive coupler. }
    - { label: Steering knuckle, src: /models/offroad-rc-vehicle/steering-knuckle.stl, caption: Front steering knuckle. }
    - { label: Lower arm, src: /models/offroad-rc-vehicle/front-lower-arm.stl, caption: Front lower suspension arm. }
    - { label: Upper arm, src: /models/offroad-rc-vehicle/front-upper-arm.stl, caption: Front upper suspension arm. }
---

- Designed the full vehicle CAD in SolidWorks: chassis, drivetrain, steering, suspension, body
- Developed a modular drivetrain supporting FWD and 4WD configurations
- Integrated Arduino control with motor drivers, DC motors, and servo steering
- Implemented PWM motor control, steering calibration, and a serial command interface
- Revised suspension arm lengths and steering knuckles in a second design pass
