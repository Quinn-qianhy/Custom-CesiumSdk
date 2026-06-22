/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["exports","./ComponentDatatype-b70c432c"],(function(t,n){"use strict";const o={computePositions:function(t,o,e,s,c){const r=.5*t,i=-r,a=s+s,u=new Float64Array(3*(c?2*a:a));let y,f=0,m=0;const p=c?3*a:0,h=c?3*(a+s):3*s;for(y=0;y<s;y++){const t=y/s*n.CesiumMath.TWO_PI,a=Math.cos(t),l=Math.sin(t),C=a*e,M=l*e,b=a*o,d=l*o;u[m+p]=C,u[m+p+1]=M,u[m+p+2]=i,u[m+h]=b,u[m+h+1]=d,u[m+h+2]=r,m+=3,c&&(u[f++]=C,u[f++]=M,u[f++]=i,u[f++]=b,u[f++]=d,u[f++]=r)}return u}};t.CylinderGeometryLibrary=o}));
