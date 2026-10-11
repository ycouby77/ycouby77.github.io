---
title: Humanoid Neck-Tilt Mechanism
order: 2
featured: true
context: Baker Bot · WE First Club
period: May 2026 - Aug. 2026
disciplines: [Humanoid robotics, Mechanism design, Integration]
summary: >-
  The neck-tilt mechanism for Baker Bot, a torso-up humanoid lecture-assistant robot built by the WE First club.
  Two angled servos drive ball-jointed pushrods against a rear fixed link, so the head can nod (pitch) and tilt
  slightly sideways (limited roll). I developed it from concept to working hardware; the rotation base under it
  was a teammate's.
objective: >-
  Give a humanoid head natural pitch and limited roll inside a compact neck, carrying the head's weight with
  hobby-grade servos.
tools: [Onshape, 3D printing, 40 kg servos, Ball-joint linkages, Prototyping]
specs:
  - { label: DOF, value: '2 (pitch, limited roll)' }
  - { label: Actuation, value: 2 × 40 kg servo }
  - { label: Linkage, value: 2-DOF parallel }
  - { label: Role, value: Design → integration }
results:
  - Linkage validated on the bench before integration; pitch motion tested on the final assembly
  - Basic nodding working on the robot with the full head; integrated with a teammate's rotation base and handed off to the software and torso teams
gallery:
  - { src: ./bench-prototype.png, alt: Bench prototype of the neck with two servos and a red triangular top plate, label: '01', caption: Bench prototype }
  - { src: ./final-cad.png, alt: Onshape CAD of the neck mechanism with the head attached, label: '02', caption: Final CAD with head, matte: '#ffffff' }
  - { src: ./on-baker-bot.png, alt: The finished neck and head mounted on the Baker Bot torso, label: '03', caption: Integrated on Baker Bot }
viewer:
  title: Neck assembly in 3D
  models:
    - { label: Tilt assembly, src: /models/humanoid-neck/neck-assembly.glb, rotation: [-90, 0, 0] }
---

- Developed the 2-DOF neck-tilt mechanism from concept to working hardware: two angled 40 kg servos drive ball-jointed pushrods against a rear fixed link for pitch and limited roll
- Did the full Onshape design, using off-the-shelf rod ends and custom 3D-printed mounts
- Prototyped and iterated it on a standalone bench rig before moving to the head
- Implemented basic nodding and integrated the neck with a teammate's rotation base
- Handed off to the software and torso teams
