# cnvSDF2

**jitech's "SDF Editor"**   https://joetech.itch.io/sdf-editor
It is a good SDF modeling tool.  But there are still few functions.

**"cnvSDF2.py"** convert "SDF Editor"'s  output data to GLSL or Shadertoy code.

"convSDF" https://github.com/ultrahamlet/convSDF is odler version, can not handle the hierarchical structure of rotation and translation.

"cnvSDF2" handlecan hierarchical structure of rotation and translation of "SDF Editor".Although not confirmed by a complete test.
Right now, "cnvSDF2" handle only ellipsoid and cube, but But soon there will be a version that can handle other SDF models

**step1:** Modeling SDF model with "SDF Editor" and output "sample.json"
As you see image below, you just copy and paste "float sdf(vec3 p0){ .... }.

>python convSDF2.py
this will read "sample.json"

**step2:** Copy and paste output of above to head of "viewSDF2.frag".

**step3:** Copy and replace float "sdf(vec3 p0){...} of "vewSDF2.frag".

![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/cnvSDF2Output.jpg?raw=true)


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/heli.jpg?raw=true)


Showing with shadertoy code, "viewSDF2.frag" .


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/shadertoy.png?raw=true)

in terms of "viewSDF2.frag"
I uploaded a version that turns the rotor.
http://dcf.jp/viewSDF2.html
or
https://www.shadertoy.com/view/NtXGRH

