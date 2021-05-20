//----------------------------------------------------------------
vec3 ElRa_1 = vec3( 2, 2, 2 );
vec3 TrIn_2 = vec3(-3.0 ,-1.0 ,-0.0);
mat3 RoIn_3 = mat3( 0.96592583,-0.25881905,0.,0.25881905,0.96592583,0.,0.,0.,1.);
vec3 ElRa_4 = vec3( 4, 1, 0.5 );
vec3 TrIn_5 = vec3(-7.0 ,-2.0 ,-0.3);
mat3 RoIn_6 = mat3(1.,0.,0.,0.,1.,0.,0.,0.,1.);
vec3 ElRa_7 = vec3( 0.9, 0.9, 0.1 );
vec3 TrIn_8 = vec3(-0.0 ,-2.6 ,-0.0);
mat3 RoIn_9 = mat3(1.,0.,0.,0.,1.,0.,0.,0.,1.);
vec3 ElRa_10 = vec3( 5, 0.1, 0.2 );
vec3 ElRa_11 = vec3( 0.2, 0.1, 5 );
vec3 TrIn_12 = vec3(-0.0 ,-1.1 ,-0.0);
vec3 ElRa_13 = vec3( 0.2, 2, 0.2 );
vec3 TrIn_14 = vec3(-0.0 ,0.9 ,-1.8);
vec3 ElRa_15 = vec3( 2, 0.6, 0.6 );
vec3 TrIn_16 = vec3(-0.0 ,0.9 ,1.8);
vec3 ElRa_17 = vec3( 2, 0.6, 0.6 );
//----------------------------------------------------------------
// --------[ Original ShaderToy begins here ]---------- //
const float epsilon = 0.01;
const float pi = 3.14159265359;
const float halfpi = 1.57079632679;
const float twopi = 6.28318530718;



#define LIGHT normalize(vec3(1.0, 1.0, 0.0))

mat3 rotateMat(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
    return m;
}

 vec3 mTranslation(vec3 inv_translation, vec3 p)
 {
     return p + inv_translation;
 }

 vec3 mRotation(mat3 inv_rotation, vec3 p)
 {
     return inv_rotation * p;
 }

 vec3 mMirror(vec3 normal, float dist, vec3 p)
    {
        float d = max(0.0, dot(normal, p) - dist);
        return p - 2.0 * d * normal;
    }

float oSmoothUnion(float k, float d1, float d2)
{
    float h = clamp(0.5 + 0.5*(d1 - d2) / k, 0.0, 1.0);
    return mix(d1, d2, h) - k*h*(1.0-h);
}

float oSmoothSubtraction(float k, float d1, float d2)
{
    float h = clamp(0.5 - 0.5*(d1 + d2) / k, 0.0, 1.0);
    return mix(d1, -d2, h) + k*h*(1.0-h);
}

float pEllipsoid(vec3 r, vec3 p)
 {
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return k0*(k0-1.0)/k1;
}

float pCylinder(float r, float h, vec3 p)
{
     vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
     return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float pInfCylinder(float r, vec3 p)
{
      return length(p.xz) - r;
}

//Quatertion Formula taken from http://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
vec4 RotationToQuaternion(vec3 axis, float angle)
{
    float half_angle = angle * halfpi / 180.0;
    vec2 s = sin(vec2(half_angle, half_angle + halfpi));
    return vec4(axis * s.x, s.y);
}

vec3 Rotate(vec3 pos, vec3 axis, float angle)
{
    axis = normalize(axis);
    vec4 q = RotationToQuaternion(axis, angle);
    return pos + 2.0 * cross(q.xyz, cross(q.xyz, pos) + q.w * pos);
}

mat2 Rot(float a) 
{
    vec2 s = sin(vec2(a, a + pi/2.0));
    return mat2(s.y,s.x,-s.x,s.y);
}

float oUnion(float d1, float d2)
     {
        return min(d1, d2);
     }


float sdf(vec3 p0)
{
	float d1;
	float d2;
	float d3;
	float d4;
	float d5;
	float d6;
	float d7;
	float d8;

	d1 = pEllipsoid(ElRa_1, p0);
	{
		vec3 p1 = mTranslation(TrIn_2, p0);
		{
			vec3 p2 = mRotation(RoIn_3, p1);
			d2 = pEllipsoid(ElRa_4, p2);
		}
	}
	{
		vec3 p1 = mTranslation(TrIn_5, p0);
		{
			vec3 p2 = mRotation(RoIn_6, p1);
			d3 = pEllipsoid(ElRa_7, p2);
		}
	}
	{
		vec3 p1 = mTranslation(TrIn_8, p0);
		{
            mat3 mt = rotateMat(p1,iTime,vec3(0.,1.,0.));
			//vec3 p2 = mRotation(RoIn_9, p1);
            vec3 p2 = mRotation(mt, p1);
			d4 = pEllipsoid(ElRa_10, p2);
			d5 = pEllipsoid(ElRa_11, p2);
		}
	}
	{
		vec3 p1 = mTranslation(TrIn_12, p0);
		d6 = pEllipsoid(ElRa_13, p1);
	}
	{
		vec3 p1 = mTranslation(TrIn_14, p0);
		d7 = pEllipsoid(ElRa_15, p1);
	}
	{
		vec3 p1 = mTranslation(TrIn_16, p0);
		d8 = pEllipsoid(ElRa_17, p1);
	}
	return oUnion(d1, oUnion(d2, oUnion(d3, oUnion(d5, oUnion(d4, oUnion(d6, oUnion(d7, d8)))))));
}
//----------------------------------------------------------------------------------

//Distance Field function by iq :
//http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sdSphere(vec3 p, float s)
{
  return length(p) - s;
}

float sdEllipsoid( in vec3 p, in vec3 r) 
{
    return (length(p/r ) - 1.) * min(min(r.x,r.y),r.z);
}

vec3 opRep( vec3 p, vec3 c )
{
    return mod(p,c)-0.5*c;
}

float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

//taken from shane's desert canyon, originaly a modification of the smin function by iq
//https://www.shadertoy.com/view/Xs33Df
float smax(float a, float b, float s)
{   
    float h = clamp( 0.5 + 0.5*(a-b)/s, 0., 1.);
    return mix(b, a, h) + h*(1.0-h)*s;
}



vec3 TransformPosition(vec3 pos)
{
    pos.yz *= Rot((pos.z + 2.0)*sin(iTime*0.3)*0.2);
    pos.xy *= Rot(pos.z*sin(iTime*0.1)*0.25);
    pos.y -= 0.5 + sin(iTime*0.5)*0.2; 
    
    return pos;
}


vec3 RayMarch(vec3 rayDir, vec3 cameraOrigin)
{
    const int maxItter = 128;
    const float maxDist = 30.0;
    
    float totalDist = 0.0;
    vec3 pos = cameraOrigin;
    float dist = epsilon;
    float itter = 0.0;
    
    for(int i = 0; i < maxItter; i++)
    {
        dist = sdf(pos);
        itter += 1.0;
        totalDist += dist; 
        pos += dist * rayDir;
        
        if(dist < epsilon || totalDist > maxDist)
        {
            break;
        }
    }
    
    return vec3(dist, totalDist, itter/128.0);
}

float AO(vec3 pos, vec3 n)
{
    float res = 0.0;
    vec3 aopos = pos;
    
    for( int i=0; i<3; i++ )
    {   
        aopos = pos + n*0.2*float(i);
        float d = sdf(aopos);
        res += d;
    }

    return clamp(res, 0.0, 1.0);   
}


//Camera Function by iq :
//https://www.shadertoy.com/view/Xds3zN
mat3 SetCamera( in vec3 ro, in vec3 ta, float cr )
{
    vec3 cw = normalize(ta-ro);
    vec3 cp = vec3(sin(cr), cos(cr), 0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

//Normal and Curvature Function by Nimitz;
//https://www.shadertoy.com/view/Xts3WM
vec4 NorCurv(in vec3 p)
{
    vec2 e = vec2(-epsilon, epsilon);   
    float t1 = sdf(p + e.yxx), t2 = sdf(p + e.xxy);
    float t3 = sdf(p + e.xyx), t4 = sdf(p + e.yyy);

    float curv = .25/e.y*(t1 + t2 + t3 + t4 - 4.0 * sdf(p));
    return vec4(normalize(e.yxx*t1 + e.xxy*t2 + e.xyx*t3 + e.yyy*t4), curv);
}

vec3 Lighting(vec3 n, vec3 rayDir, vec3 reflectDir, vec3 pos)
{
    float diff = max(0.0, dot(LIGHT, n));
    float spec = pow(max(0.0, dot(reflectDir, LIGHT)), 10.0);
    float rim = (1.0 - max(0.0, dot(-n, rayDir)));

    return vec3(diff, spec, rim)*0.5; 
}

float TriplanarTexture(vec3 pos, vec3 n)
{
    return 0.0; 
}

float BackGround(vec3 rayDir)
{
    float sun = smoothstep(1.0, 0.0, clamp(length(rayDir - LIGHT), 0.0, 1.0));
    
    return sun*0.5;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy/iResolution.xy;
    
    vec3 cameraOrigin = vec3(0.0, 0.0, 0.0);
    
    if(iMouse.z > 0.0)
    {
        cameraOrigin.x = sin(iMouse.x*0.01) * 5.0;
        cameraOrigin.y = iMouse.y*0.05 - 10.0;
        cameraOrigin.z = cos(iMouse.x*0.01) * 5.0;  
    }
    else    
    {
        cameraOrigin.x = sin(iTime*0.25 + 2.0) * (6.0 + sin(iTime * 0.1));
        cameraOrigin.y = sin(iTime*0.3) - 0.5;
        cameraOrigin.z = cos(iTime*0.25 + 2.0) * (6.0 + sin(iTime * 0.15)) - 15.0; 
    }
    
    vec3 cameraTarget = vec3(0.0, 0.25, -1.0);
    
    vec2 screenPos = uv * 2.0 - 1.0;
    
    screenPos.x *= iResolution.x/iResolution.y;
    
    mat3 cam = SetCamera(cameraOrigin, cameraTarget, sin(iTime*0.15)*0.5);
    
    vec3 rayDir = cam*normalize(vec3(screenPos.xy,2.0));
    vec3 dist = RayMarch(rayDir, cameraOrigin);
    
    float res;
    float backGround = BackGround(rayDir);
    
    if(dist.x < epsilon)
    {
        vec3 pos = cameraOrigin + dist.y*rayDir;
        vec4 n = NorCurv(pos);
        float ao = AO(pos, n.xyz);
        vec3 r = reflect(rayDir, n.xyz);
        vec3 l = Lighting(n.xyz, rayDir, r, pos);
        
        float col = TriplanarTexture(pos, n.xyz);
        col *= n.w*0.5+0.5;
        col *= ao;
        col += ao * (l.x + l.y);
        col += l.z*0.75;
        col += BackGround(n.xyz)*0.25;

        res = col;
    }
    else
    {
        res = backGround; 
    }
    
    fragColor = vec4(vec3(res), 1.0);
}
// --------[ Original ShaderToy ends here ]---------- //
