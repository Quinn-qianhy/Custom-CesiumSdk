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
define(["exports","./defaultValue-966506b9"],(function(e,t){"use strict";e.combine=function e(n,o,r){r=t.defaultValue(r,!1);const f={},i=t.defined(n),a=t.defined(o);let s,u,c;if(i)for(s in n)n.hasOwnProperty(s)&&(u=n[s],a&&r&&"object"==typeof u&&o.hasOwnProperty(s)?(c=o[s],f[s]="object"==typeof c?e(u,c,r):u):f[s]=u);if(a)for(s in o)o.hasOwnProperty(s)&&!f.hasOwnProperty(s)&&(c=o[s],f[s]=c);return f}}));
