---
title: Humanoid Neck Mechanism
order: 2
featured: true
context: Baker Bot · WE First Club
period: Summer 2026
disciplines: [Humanoid robotics, Mechanism design, Integration]
summary: >-
  The neck for Baker Bot, a torso-up humanoid lecture-assistant robot built by the WE First club. Two
  servos drive ball-jointed pushrods against a fixed-length rear link, so the head can nod (pitch) and
  tilt sideways (roll) like a person's. I owned it from first idea to the part on the robot.
objective: >-
  Give a humanoid head natural pitch and roll inside a compact neck, carrying the head's weight with
  hobby-grade servos.
tools: [Onshape, 3D printing, 40 kg servos, Ball-joint linkages, Prototyping]
specs:
  - { label: DOF, value: '2 (pitch, roll)' }
  - { label: Actuation, value: 2 × 40 kg servo }
  - { label: Linkage, value: 2-DOF parallel }
  - { label: Role, value: Concept → integration }
results:
  - Linkage validated on the bench before integration; pitch motion tested on the final assembly
  - Final neck mounted on the robot with the full head, and handed off to the software and torso teams
gallery:
  - { src: ./bench-prototype.png, alt: Bench prototype of the neck with two servos and a red triangular top plate, label: '01', caption: Bench prototype }
  - { src: ./final-cad.png, alt: Onshape CAD of the neck mechanism with the head attached, label: '02', caption: Final CAD with head }
  - { src: ./on-baker-bot.png, alt: The finished neck and head mounted on the Baker Bot torso, label: '03', caption: Integrated on Baker Bot }
viewer:
  title: Neck assembly in 3D
  models:
    - { label: Tilt assembly, src: /models/humanoid-neck/neck-assembly.glb, rotation: [-90, 0, 0] }
---

- Came up with the 2-DOF linkage: two angled 40 kg servos driving pushrods, with a fixed-length rod at the back as the pivot and stabilizer. Moving the servos together pitches the head; moving them differentially rolls it
- Modelled the mechanism in Onshape using off-the-shelf rod ends and custom 3D-printed mounts
- Built a standalone bench prototype to prove out the linkage before touching the head
- Manufactured the final version and adapted the mounts to the head geometry
- Coordinated with the head and torso subteams on interfaces and integration
