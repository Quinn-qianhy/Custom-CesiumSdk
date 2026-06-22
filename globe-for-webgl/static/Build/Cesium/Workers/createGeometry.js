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
define(["./defaultValue-ac2201bb","./PrimitivePipeline-cef2c010","./createTaskProcessorWorker","./Transforms-6044519c","./Matrix2-b4a5c73a","./RuntimeError-d45af186","./ComponentDatatype-b70c432c","./WebGLConstants-e12cdc8a","./_commonjsHelpers-c9124efa","./combine-0dce9b0f","./GeometryAttribute-432d65a5","./GeometryAttributes-d060f8b5","./GeometryPipeline-143561e8","./AttributeCompression-08d894be","./EncodedCartesian3-5f14d916","./IndexDatatype-f5e4626a","./IntersectionTests-dbd485e6","./Plane-031e0597","./WebMercatorProjection-90c819c4"],(function(e,t,r,n,o,i,c,s,a,f,u,d,m,b,l,p,y,P,k){"use strict";const C={};function G(t){let r=C[t];return e.defined(r)||("object"==typeof exports?C[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,C[r]=e}))),r}return r((function(r,n){const o=r.subTasks,i=o.length,c=new Array(i);for(let t=0;t<i;t++){const r=o[t],n=r.geometry,i=r.moduleName;if(e.defined(i)){const e=G(i);c[t]=e(n,r.offset)}else c[t]=n}return Promise.all(c).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
