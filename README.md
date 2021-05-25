# cnvSDF2.py

### cnvSDF2.py    'rotation bug fixed 21/05/24'  
----------------------------------------------------------------------------------------------------------------------------------

**jitech's "SDF Editor"**   https://joetech.itch.io/sdf-editor  
is a very good tool for modeling SDF primitives.    
But there are still few functions.

**"cnvSDF2.py"** convert SDF Editor's json file to GLSL or Shadertoy code.

**"cnvSDF2"** handle hierarchical structure of rotation and translation of "SDF Editor".  
(Although not confirmed by a complete test.)  
Right now, "cnvSDF2" handle only ellipsoid and cube, but soon  
there will be a version that can handle other SDF models, or you can 
extend it by yourelf.
  
  
**STEPS**  
  
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

https://www.shadertoy.com/view/NtXGRH

