# cnvSDF2

cnvSDF2.py convert "SDF Editor". data to GLSL or Shadertoy code.

"convSDF" is odler version, can not  handle the hierarchical structure of rotation and translation of 
"cnvSDF2" handle only ellipsoid SDF, but in this version can output  hierarchical structure of rotation and translation of "SDF Editor".
Although not confirmed by a complete test.
Right now, "cnvSDF2" handle only ellipsoid SDF, but But soon there will be a version that can handle other SDF models


step1:Modeling SDF model with "SDF Editor" and output "sample.json"
As you see image below, you just copy and paste "float sdf(vec3 p0){ .... }.

>python convSDF2.py
this will read "sample.json"

step2:Copy and paste output of above to head of "viewSDF2.frag".

step3:Copy and replace float "sdf(vec3 p0){...} of "vewSDF2.frag".

![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/cnvSDF2Output.jpg?raw=true)


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/heli.jpg?raw=true)


Showing with shadertoy code, "viewSDF2.frag" .


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/shadertoy.png?raw=true)



http://dcf.jp/viewSDF2.html

