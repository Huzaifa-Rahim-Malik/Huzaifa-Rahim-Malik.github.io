// ====================================================================================
//  EDIT THIS FILE to change hero pictures, project text, captions, images and demos.
//  - Paths are relative to index.html (e.g. "images/Portfolio/hero1.webp").
//  - Every item in a list ends with a comma EXCEPT the last one.
//  - gal / specs / demo entries are pairs:  ["file or label", "caption or value"]
//  - Use "demo": null  when a project has no demo video.
//  - Do not put a plain " inside text. Use curly quotes “ ” instead.
// ====================================================================================

// Pictures in the home-page collage (hero4 needs the c4 slot in index.html)
const HERO = {
  "hero1": "images/Portfolio/hero1.webp",
  "hero2": "images/Portfolio/hero2.webp",
  "hero3": "images/Portfolio/hero3.webp",
  "hero4": "images/Portfolio/hero4.webp"
};

// All projects (order here = order on the site)
const PROJECTS = [
  {
    "id": "rover",
    "title": "AT-IntelliRover: 4WD Outdoor Autonomous Vehicle",
    "tag": "Outdoor robotics",
    "status": "Design Completed",
    "cover": "images/AT_IntelliRover/cover.webp",
    "sum": "A ROS 2 skid-steer platform for outdoor navigation, 3D mapping and perception, with a custom power distribution board I designed.",
    "ov": [
      "A four-wheel-drive, skid-steer outdoor platform on an aluminium-extrusion chassis with independent suspension at every wheel and 10-inch solid, flat-free tyres. Perception and compute are split across two NVIDIA Jetson modules: an Orin Nano Super for the sensor stack and a Jetson AGX Orin 64GB for navigation, SLAM and perception, with a 10.4-inch touch display for on-vehicle monitoring.",
      "An Arduino Mega 2560 sits between the Jetson and the actuators, generating control signals for two 2×40 A motor drivers (four geared DC motors with encoders) and PWM-controlling the enclosure fans. Everything runs from one 14.8 V, 48 Ah LiPo pack through a custom power board, with DC-DC converters producing 5 V, 12 V and 19 V rails."
    ],
    "hl": [
      "Custom Altium power board (130×95 mm): XT90 input, PCB fuse block, P-channel MOSFET reverse-polarity protection and five Infineon BTS50005 smart high-side switches.",
      "Separate protected rails for the compute/sensor stack and each motor-driver section.",
      "Estimated peak system current of about 35 A (excluding motor stall), used to size the whole power chain.",
      "Supports custom navigation, SLAM and perception algorithm development."
    ],
    "specs": [
      ["Drive", "4WD, differential (skid) steering"],
      ["Dimensions", "860 × 677 × 458 mm"],
      ["Weight", "30 kg (platform only)"],
      ["Payload", "19 kg actual / 22 kg max"],
      ["Main computer", "Jetson AGX Orin 64GB"],
      ["Sensor computer", "Jetson Orin Nano Super"],
      ["Microcontroller", "Arduino Mega 2560"],
      ["Sensors", "3D/2D LiDAR, RGB-D camera, GPS, DHT22"],
      ["Motors", "4 × goBILDA 5303 Saturn planetary gear motor"],
      ["Battery", "14.8 V, 48 Ah (4 × 4S 12000 mAh)"]
    ],
    "gal": [
      ["images/AT_IntelliRover/gallery1.webp", "3D design"],
      ["images/AT_IntelliRover/gallery2.webp", "System block diagram"],
      ["images/AT_IntelliRover/gallery3.webp", "Electronics layout"],
      ["images/AT_IntelliRover/gallery4.webp", "Custom power distribution board (3D PCB)"]
    ],
    "demo": null,
    "tech": [
      "ROS 2",
      "Jetson AGX Orin",
      "Orin Nano Super",
      "Arduino Mega",
      "3D LiDAR",
      "Altium Designer"
    ],
    "role": "Electronics design: electrical architecture and custom power distribution board. Team project at AITeC Islamabad.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/Outdoor-Autonomous-Vehicle"
  },
  {
    "id": "quadruped",
    "title": "12-DOF Quadruped Robot",
    "tag": "Legged robotics",
    "status": "Algorithm development",
    "cover": "images/Quadruped_Robot/cover.webp",
    "sum": "Electronics and control design for a 3D-printed legged platform: four legs, three joints each, driven by a Raspberry Pi 4B.",
    "ov": [
      "A four-legged platform with three actuated joints per leg (hip, thigh, shin), giving 12 degrees of freedom. A Raspberry Pi 4B acts as the main controller and talks to a dedicated servo controller over I2C, which issues PWM commands across two channel banks for the front and back legs.",
      "Power comes from an 11.1 V, 5200 mAh LiPo pack split across three buck converters: two high-current 6.5 V rails for the front and back servo banks, and a 5 V rail for the Raspberry Pi. A DC fan cools the electronics bay under sustained load."
    ],
    "hl": [
      "Worst-case current modeled across idle, typical gait and all-servos-stalled scenarios for two candidate servo options, used to size the buck converters.",
      "Two 6.5 V / 15 A rails and one 5 V / 3.5 A rail; peak battery draw of roughly 16–17 A in the all-stalled case.",
      "ABS used at leg and joint mounts for impact resistance, PLA for lower-load parts.",
      "Altium schematics, BOM, wiring and load-calculation documents in the repo."
    ],
    "specs": [
      ["Configuration", "Quadruped, 12 DOF (4 legs × 3 joints)"],
      ["Dimensions", "306 × 204 × 180 mm"],
      ["Frame", "FDM 3D-printed ABS and PLA"],
      ["Main controller", "Raspberry Pi 4B"],
      ["Servo control", "I2C-driven, two PWM banks"],
      ["Servos evaluated", "MG996R (~11 kg·cm) / DS3218MG (~20 kg·cm)"],
      ["Battery", "11.1 V, 5200 mAh LiPo"]
    ],
    "gal": [
      ["images/Quadruped_Robot/gallery1.webp", "Top view"],
      ["images/Quadruped_Robot/gallery2.webp", "3D design / simulation"],
      ["images/Quadruped_Robot/gallery3.webp", "System block diagram"]
    ],
    "demo": ["images/Quadruped_Robot/demo1.webp", "Walk demo. The initial gait implementation was done by a teammate."],
    "tech": [
      "Raspberry Pi 4B",
      "I2C / PWM",
      "Power design",
      "Altium Designer",
      "3D printing"
    ],
    "role": "Electronics design. Team project at AITeC Islamabad, now in algorithm development.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/12-DOF-Quadrupled-Dog"
  },
  {
    "id": "swarm",
    "title": "Mini Swarm Vehicle",
    "tag": "Swarm robotics",
    "status": "Completed",
    "cover": "images/Mini_Swarm_Vehicle/cover.webp",
    "sum": "A compact 3D-printed differential-drive robot for swarm and indoor navigation research, with its own electronics and low-level control.",
    "ov": [
      "A two-wheel differential-drive robot (two geared DC motors plus a passive front caster) with onboard IMU, 2D LiDAR and a camera, intended to run alone or as part of a coordinated swarm. A three-plate 3D-printed chassis carries an Arduino-based motor controller and a Jetson Nano or Raspberry Pi 5 for higher-level compute.",
      "The Arduino runs a PID differential-drive controller on encoder feedback and exposes a ROS-compatible serial interface, keeping real-time motor control separate from planning on the Jetson."
    ],
    "hl": [
      "Bottom, middle and top plates printed in CPE, with reinforced motor mounts; structure checked under a 2 kg payload by FEA.",
      "Modular sandwich assembly with M3 screws and standoffs for easy maintenance.",
      "Firmware based on the open-source ROSArduinoBridge library.",
      "Altium drive-controller schematic, BOM and hardware wiring documents in the repo."
    ],
    "specs": [
      ["Drive", "2WD, differential"],
      ["Dimensions", "212 × 215 mm footprint"],
      ["Weight", "1.5 kg"],
      ["High-level compute", "Jetson Nano / Raspberry Pi 5"],
      ["Low-level control", "Arduino Nano"],
      ["Sensors", "2D LiDAR, camera, IMU"],
      ["Wheels", "65 mm diameter"],
      ["Battery", "11.1 V, 3500 mAh Li-ion"]
    ],
    "gal": [
      ["images/Mini_Swarm_Vehicle/gallery1.webp", "Assembled vehicle"],
      ["images/Mini_Swarm_Vehicle/gallery2.webp", "Render"],
      ["images/Mini_Swarm_Vehicle/gallery3.webp", "Chassis CAD"],
      ["images/Mini_Swarm_Vehicle/gallery4.webp", "System overview"]
    ],
    "demo": null,
    "tech": [
      "ROS 2",
      "Arduino",
      "Jetson Nano",
      "Raspberry Pi 5",
      "2D LiDAR",
      "PID control"
    ],
    "role": "Electronics design. Team project at AITeC Islamabad.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/Mini_Swarm_vehicle"
  },
  {
    "id": "llmnav",
    "title": "LLM-Based Navigation on TurtleBot 4",
    "tag": "AI + navigation",
    "status": "Completed",
    "cover": "images/LLM_Based_Navigation/cover.webp",
    "sum": "Speak or type “take me to the robotics lab” and a fully local assistant turns it into Nav2 motion. Speech, LLM and voice output all run on-device.",
    "ov": [
      "A voice- and text-controlled navigation assistant for a TurtleBot 4 running ROS 2 Jazzy, SLAM Toolbox and Nav2. A local LLM (Ollama) handles conversation and ambiguous requests, Whisper transcribes speech, Piper speaks replies, and Nav2 drives the robot to the goal. No cloud services are used.",
      "Navigation commands use fast, deterministic rule-based matching first, with the LLM as a fallback for requests the rules cannot resolve. Chat stays live while the robot is driving, and a Tkinter GUI shows chat, locations and live odometry, LiDAR, IMU and battery plots."
    ],
    "hl": [
      "Language understanding rose from 74% (39/53) with rules only to 89% (47/53) with the LLM fallback.",
      "Whisper large-v3 reached 10.2% word error rate at about 0.17 s per clip on GPU.",
      "On the real robot, 10 of 10 navigation trials reached the goal with no bumper collisions, and all 3 unknown places were refused without moving.",
      "Limitations are documented honestly: small samples (two short routes, five runs each), typed commands only, and filler-word and synonym handling still to improve."
    ],
    "specs": [
      ["Stack", "ROS 2 Jazzy, Nav2, SLAM Toolbox, AMCL"],
      ["LLM", "llama3.2:3b via Ollama (default)"],
      ["Speech-to-text", "faster-whisper (base / small / large-v3)"],
      ["Text-to-speech", "Piper (en_US-ryan-medium)"],
      ["Intent and location", "Rules first, LLM fallback, multi-stop queue"],
      ["Evaluation", "53 text commands, 39 spoken clips, 10 robot trials"]
    ],
    "gal": [
      ["images/LLM_Based_Navigation/gallery1.webp", "GUI and RViz visualization"],
      ["images/LLM_Based_Navigation/gallery2.webp", "Overall Flow of System"]
    ],
    "demo": ["images/LLM_Based_Navigation/demo1.mp4", "Voice command to robot arrival."],
    "demo2": ["images/LLM_Based_Navigation/demo2.mp4", "Real-time navigation between two locations."],
    "tech": [
      "ROS 2 Jazzy",
      "Nav2",
      "SLAM Toolbox",
      "Ollama",
      "Whisper",
      "Piper TTS",
      "Python"
    ],
    "role": "Research and implementation. A conference paper on this work is in preparation.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/LLM-Based-Navigation-Using-Turtlebot4"
  },
  {
    "id": "multirobot",
    "title": "LLM Multi-Robot Navigation and Robot Tracking",
    "tag": "AI + multi-robot",
    "status": "Completed",
    "cover": "images/Multi-Robot Navigation and RobotTracking/GUI.webp",
    "sum": "A leader-follower multi-robot system: a TurtleBot 4 driven by voice and text commands, dual ZED 2i cameras tracking every robot, and pose hand-off to a custom mini swarm vehicle.",
    "ov": [
      "An extension of my LLM-based TurtleBot 4 navigation work to a leader-follower setup in an 8 × 3 m indoor arena. The TurtleBot 4 leader takes natural-language text or voice commands (Whisper, Ollama and Nav2 on ROS 2 Jazzy), and on arrival it publishes its position so the custom Mini Swarm Vehicle follower can be sent to it.",
      "Two ceiling-mounted ZED 2i cameras run YOLOv8 detection and convert each detection to arena coordinates with a per-camera affine transform. Detections are fused across cameras and matched over time with the Hungarian algorithm, giving persistent global track IDs that survive hand-off between cameras. A three-column Tk GUI shows chat, both camera views, arena tracking, locations and the leader sensor data."
    ],
    "hl": [
      "Global tracking pipeline: ZED 2i depth to XYZ, affine transform to arena (x, y), cross-camera fusion and Hungarian matching for persistent track IDs.",
      "Click-based camera calibration tool that fits the transform from 8 to 12 arena marker points per camera.",
      "Leader pose published at 10 Hz plus a one-shot arrival position, bridged between ROS domains 23 (leader) and 35 (follower) with domain_bridge.",
      "Two-class YOLOv8 model trained for the ZED camera views."
    ],
    "specs": [
      ["Stack", "ROS 2 Jazzy, Nav2, SLAM Toolbox, AMCL"],
      ["Leader", "TurtleBot 4"],
      ["Follower", "Custom Mini Swarm Vehicle"],
      ["Cameras", "2 × ZED 2i, YOLOv8 detection"],
      ["Language and speech", "Ollama LLM, Whisper, Piper TTS"],
      ["Arena", "8 × 3 m indoor arena"]
    ],
    "gal": [
      ["images/Multi-Robot Navigation and RobotTracking/system.png", "Overall Flow of System"]
    ],
    "demo": ["images/Multi-Robot Navigation and RobotTracking/GUI.mp4", "Real-Time GUI"],
    "demo2": ["images/Multi-Robot Navigation and RobotTracking/Camera.mp4", "Multiple Robot Tracking in Arena"],
    "tech": [
      "ROS 2 Jazzy",
      "Nav2",
      "Ollama",
      "Whisper",
      "YOLOv8",
      "ZED 2i",
      "Python"
    ],
    "role": "TurtleBot 4 algorithm design and GUI development.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/LLM-Multi-Robot-Navigation-and-Robot-Tracking"
  },
  {
    "id": "faultrig",
    "title": "Industrial Fault Simulator",
    "tag": "Predictive maintenance",
    "status": "V1.0 built, V2.0 in manufacturing",
    "cover": "images/Industrial_Fault_Simulator/cover.webp",
    "sum": "A bench-scale rig that reproduces industrial machine faults under repeatable conditions and records labeled multi-sensor data.",
    "ov": [
      "A motor-driven shaft (motor, gearbox and flywheel) loaded by a magnetic powder brake, instrumented with vibration, current, temperature, speed and liquid-level sensors. Faults are injected through weight loads, the brake, a pump and water tank, and electrical and bearing effects, then recorded as labeled datasets for diagnostic and machine-learning work.",
      "Signals are digitized by an NI USB-6008 DAQ and an Arduino and logged through a custom LabVIEW application, with Python used for plotting and analysis. Version 2.0, with industrial-grade sensors and a redesigned architecture, is in manufacturing."
    ],
    "hl": [
      "Altium sensor-interface and power-distribution design for 24 V, 12 V and 5 V rails and the brake controller.",
      "Sample datasets at no load and 2, 5, 7 and 10 kg loads, plus current-sensor and accelerometer captures.",
      "Accelerometer data synchronized with the LabVIEW DAQ data in one unified log.",
      "Aimed at remaining-useful-life estimation and predictive maintenance."
    ],
    "specs": [
      ["Drive", "Induction motor, gearbox, magnetic powder brake"],
      ["Sensors", "MPU9250 accelerometers, per-phase current, tachometer, temp/humidity, water level"],
      ["Acquisition", "NI USB-6008 + Arduino, LabVIEW"],
      ["Analysis", "Python plotting and logging"],
      ["Load cases", "No load, 2 / 5 / 7 / 10 kg"],
      ["Status", "V1.0 working, V2.0 in manufacturing"]
    ],
    "gal": [
      ["images/Industrial_Fault_Simulator/gallery1.webp", "Fault simulator"],
      ["images/Industrial_Fault_Simulator/gallery2.webp", "LabVIEW acquisition GUI"],
      ["images/Industrial_Fault_Simulator/gallery3.webp", "Sample data plot"],
      ["images/Industrial_Fault_Simulator/gallery4.webp", "V2.0 manufactured parts"],
      ["images/Industrial_Fault_Simulator/gallery5.webp", "V2.0 CAD design"]
    ],
    "demo": null,
    "tech": [
      "LabVIEW",
      "NI DAQ",
      "MPU9250",
      "Python",
      "Arduino",
      "Altium Designer"
    ],
    "role": "Electronics design for V1.0. Team project at AITeC Islamabad.",
    "repo": "https://github.com/Huzaifa-Rahim-Malik/Industrial-Fault-Simulator"
  },
  /* X500 DRONE PROJECT - hidden until data is ready. To show it again, delete this line and the closing marker below.
  {
    "id": "drone",
    "title": "Drone Obstacle Avoidance on the X500 V2",
    "tag": "UAV autonomy",
    "status": "Ongoing research",
    "cover": "images/Drone_Obstacle_Avoidance/cover.svg",
    "sum": "A comparison of two obstacle-avoidance pipelines on one airframe: ArduPilot BendyRuler on a Jetson versus a second approach in PX4 SITL.",
    "ov": [
      "Two approaches to obstacle avoidance are being implemented and compared on an X500 V2 drone with a Pixhawk 6X flight controller, a Jetson Orin Nano companion computer and a ZED 2i Mini stereo camera. Option A uses ArduPilot BendyRuler and is already running on the Jetson; Option B is being prototyped in PX4 SITL.",
      "Option A streams obstacle distances from stereo depth to the Pixhawk at 10 Hz over a MAVLink bridge. Option B is built on Ubuntu 24.04 with ROS 2 Jazzy and Gazebo Harmonic, next requiring a ROS-to-PX4 VIO bridge with ENU/FLU to NED/FRD frame conversion and a ported sector-based planner."
    ],
    "hl": [
      "Robust depth handling: 5th-percentile per-sector statistics to reject stereo flying-pixel noise, invalid depth treated as close-range hazard, true Euclidean distance.",
      "Option A bench-validated; outdoor GUIDED-mode flight testing is the next hardware step.",
      "Outdoor test arena of roughly 21 × 15 m.",
      "Includes a literature review of sensor fusion, monocular distance estimation and path-planning algorithms."
    ],
    "specs": [
      ["Airframe", "X500 V2"],
      ["Flight controller", "Pixhawk 6X"],
      ["Companion computer", "Jetson Orin Nano"],
      ["Camera", "ZED 2i Mini stereo"],
      ["Option A", "ArduPilot BendyRuler, MAVLink obstacle bridge"],
      ["Option B", "PX4 SITL, ROS 2 Jazzy, Gazebo Harmonic"]
    ],
    "gal": [],
    "demo": null,
    "tech": [
      "PX4",
      "ArduPilot",
      "MAVLink",
      "ROS 2 Jazzy",
      "Gazebo Harmonic",
      "ZED SDK"
    ],
    "role": "Ongoing research project. Repository not published yet.",
    "repo": null
  }
  END OF X500 DRONE PROJECT */
];
