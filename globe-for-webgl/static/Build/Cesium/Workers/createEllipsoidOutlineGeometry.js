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
define(["./defaultValue-ac2201bb","./EllipsoidOutlineGeometry-f42c4232","./Transforms-6044519c","./Matrix2-b4a5c73a","./RuntimeError-d45af186","./ComponentDatatype-b70c432c","./WebGLConstants-e12cdc8a","./_commonjsHelpers-c9124efa","./combine-0dce9b0f","./GeometryAttribute-432d65a5","./GeometryAttributes-d060f8b5","./GeometryOffsetAttribute-a17b96d9","./IndexDatatype-f5e4626a"],(function(e,t,r,n,a,i,o,c,f,u,d,b,m){"use strict";return function(r,n){return e.defined(r.buffer)&&(r=t.EllipsoidOutlineGeometry.unpack(r,n)),t.EllipsoidOutlineGeometry.createGeometry(r)}}));
