# cnvSDF2

cnvSDF2.py convert "SDF Editor". data to GLSL or Shadertoy code.

"convSDF" is odler version, can not  handle the hierarchical structure of rotation and translation of 
"cnvSDF2" can output  hierarchical structure of rotation and translation of "SDF Editor".
Although not confirmed by a complete test.


step1:Modeling SDF model with "SDF Editor" 
As you see image below, you just copy and paste "float sdf(vec3 p0){ .... }.
And run as fllows:

>python convSDF2.py

And you get:


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/heli.jpg?raw=true)


Showing with shadertoy code, "viewSDF2.frag" .


![alt text](https://github.com/ultrahamlet/cnvSDF2/blob/main/shadertoy.png?raw=true)
