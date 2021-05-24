import json
import numpy as np
# rotation matrix
def rotate_xyz(degx,degy,degz):
    # degree to radian
    r = np.radians(degx)
    cr = np.cos(r)
    sr = np.sin(r)
    r = np.radians(degy)
    cp = np.cos(r)
    sp = np.sin(r)
    r = np.radians(degz)
    cy = np.cos(r)
    sy = np.sin(r)

    R_xyz = np.matrix((
        (cy*cp, cy*sp*sr-sy*cr, cy*sp*cr+sy*sr),
        (sy*cp, sy*sp*sr+cy*cr, sy*sp*cr-cy*sr),
        (-sp, cp*sr, cp*cr)
    ))
    return R_xyz

global gcount
global pcount
gcount = 1
pcount = 0

def total(mf):
    #print(">>>> ",mf)
    global gcount
    global pcount
    if(len(mf) < 3):
        prm = 'primitive'
        spos = prim[pcount][1].replace('Vector3','vec3')
       
        #print(">>> ",strm)
        if prim[pcount][0] == 'pEllipsoid':
            #prm = 'vec3 ElRa_' + str(gcount) + ' = ' + spos + ';'
            # rotation string -> values
            prm = 'vec3 ElRa_' + str(gcount) + ' = ' + spos + ';'
        if prim[pcount][0] == 'pBox':
            prm = 'vec3 BoSi_' + str(gcount) + ' = ' + spos + ';'

        print(prm)
        gcount += 1
        pcount += 1
        return
    modi2 = mf[1]
    #print('>>>>>>>>>>>>>>>>>>>>>>>>>> ',modi2)
    if mf[0] == 'mRotation':
      
        rv = mf[2]     #totatuon value
        rt = 'mat3 RoIn_'+str(gcount)
        #
        t = rv.replace('Vector3(','')
        t = t.replace(')','')
        u = t.split(',')
        # get float rotation value
        v0 = -float(u[0])
        v1 = -float(u[1])
        v2 = -float(u[2])
        #rot = rotate_x(v0)*rotate_z(v2)
        rot = rotate_xyz(v0,v1,v2)
        #rot = rotate_x(v0)*rotate_y(v1)*rotate_y(v2)
        e = np.linalg.inv(rot) #inverse matrix
        # output matrix
        strm = str(e)
        strm = strm.replace('[[' ,'mat3(')
        strm = strm.replace(']]' ,');')
        strm = strm.replace(' ' ,'_')
        strm = strm.replace('\n' ,'')
        strm = strm.replace(']_[' ,'_')
        strm = strm.replace('_' ,',')
        strm = strm.replace('(,' ,'( ')
        #
        while  ',,' in strm:
            strm = strm.replace(',,' ,',')
        strm = strm.replace(',)' ,')')
        #
        print(rt,'=', strm)
    if mf[0] == 'mTranslation':
        
        spos = mf[len(mf)-1].replace('Vector3(','') 
        spos = spos.replace(')','')
        u = spos.split(',')
        v0 = -float(u[0])
        v1 = -float(u[1])
        v2 = -float(u[2])
        #print('--------------- tr',v0,v1,v2)
        rt = 'vec3 TrIn_'+str(gcount) #header
        rt = rt + ' = vec3(' + str(v0) +' ,'+ str(v1) + ' ,'  + str(v2) + ');'
        print(rt)
        #spos =  mf[len(mf)-1].replace('Vector3','vec3') + ';'
        #print(rt,'=', spos)
    gcount += 1
    
    for md in modi2:
       total(md)
   

# read json file
f = open('sample.json', 'r')
json_dict = json.load(f)
prim = json_dict['primitives']
j = 0

modi = json_dict['modifiers']
#print('>>>>>>>>>>>>>modifier init >>>>>>>>>>>>> ',modi)
print('//----------------------------------------------------------------')
for md in  modi:
    #print('>>>>>>>>>>>>>modifier>>>>>>>>>>>>> ',md)
    total(md)
    j += 1
print('//----------------------------------------------------------------')




