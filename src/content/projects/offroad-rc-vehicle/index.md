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
  - { label: Budget, value: Under $200 }
results:
  - Fully operational vehicle with custom chassis and drivetrain
  - Drove successfully in indoor testing after the suspension and steering revisions
  - Modular design allows component swaps without a full rebuild
gallery:
  - { src: ./build.png, alt: The finished RC vehicle with red 3D-printed suspension arms and exposed electronics, label: Build, caption: Operational vehicle }
  - { src: ./cad.png, alt: SolidWorks assembly of the full vehicle chassis and suspension, label: CAD, caption: Full SolidWorks assembly, matte: '#c4c8d3' }
viewer:
  title: Vehicle in 3D
  models:
    - { label: Full assembly, src: /models/offroad-rc-vehicle/assembly.glb, explode: true }
    - { label: Front chassis, src: /models/offroad-rc-vehicle/front-chassis.stl }
    - { label: Rear chassis, src: /models/offroad-rc-vehicle/rear-chassis.stl }
    - { label: Motor mount, src: /models/offroad-rc-vehicle/motor-mount.stl }
    - { label: Helical gear, src: /models/offroad-rc-vehicle/driven-helical-gear.stl }
    - { label: Drive coupler, src: /models/offroad-rc-vehicle/drive-coupler.stl }
    - { label: Steering knuckle, src: /models/offroad-rc-vehicle/steering-knuckle.stl }
    - { label: Lower arm, src: /models/offroad-rc-vehicle/front-lower-arm.stl }
    - { label: Upper arm, src: /models/offroad-rc-vehicle/front-upper-arm.stl }
---

- Designed the full vehicle CAD in SolidWorks: chassis, drivetrain, steering, suspension, body
- Developed a modular drivetrain supporting FWD and 4WD configurations
- Integrated Arduino control with motor drivers, DC motors, and servo steering
- Implemented PWM motor control, steering calibration, and a serial command interface
- First test drives exposed suspension and steering problems that kept it from driving; revised the suspension arm lengths and steering knuckles to get it running
