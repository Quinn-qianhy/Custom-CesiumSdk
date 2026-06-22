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
define(["./Matrix2-b4a5c73a","./defaultValue-ac2201bb","./EllipseGeometry-eebfeb9a","./RuntimeError-d45af186","./ComponentDatatype-b70c432c","./WebGLConstants-e12cdc8a","./Transforms-6044519c","./_commonjsHelpers-c9124efa","./combine-0dce9b0f","./EllipseGeometryLibrary-bf860865","./GeometryAttribute-432d65a5","./GeometryAttributes-d060f8b5","./GeometryInstance-0acc6d69","./GeometryOffsetAttribute-a17b96d9","./GeometryPipeline-143561e8","./AttributeCompression-08d894be","./EncodedCartesian3-5f14d916","./IndexDatatype-f5e4626a","./IntersectionTests-dbd485e6","./Plane-031e0597","./VertexFormat-d53ce9da"],(function(e,t,r,n,a,o,i,c,s,d,l,b,m,f,p,u,y,G,E,C,_){"use strict";return function(n,a){return t.defined(a)&&(n=r.EllipseGeometry.unpack(n,a)),n._center=e.Cartesian3.clone(n._center),n._ellipsoid=e.Ellipsoid.clone(n._ellipsoid),r.EllipseGeometry.createGeometry(n)}}));
