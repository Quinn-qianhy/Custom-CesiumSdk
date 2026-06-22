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
define(["exports","./RuntimeError-d45af186","./defaultValue-ac2201bb","./ComponentDatatype-b70c432c"],(function(e,n,t,i){"use strict";const d=i.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,n,i,f){if(!t.defined(e))return;i=t.defaultValue(i,!1);const u=t.defined(f),r=e.length;if(r<2)return e;let s,a,c,l=e[0],o=0,p=-1;for(s=1;s<r;++s)a=e[s],n(l,a,d)?(t.defined(c)||(c=e.slice(0,s),o=s-1,p=0),u&&f.push(s)):(t.defined(c)&&(c.push(a),o=s,u&&(p=f.length)),l=a);return i&&n(e[0],e[r-1],d)&&(u&&(t.defined(c)?f.splice(p,0,o):f.push(r-1)),t.defined(c)?c.length-=1:c=e.slice(0,-1)),t.defined(c)?c:e}}));
