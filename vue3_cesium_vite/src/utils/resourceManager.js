/**
 * 资源管理工具
 * 统一管理项目中的资源路径，提供标准化的资源引用方式
 */

// 资源类型枚举
export const ResourceType = {
  IMAGE: "image",
  EX_IMAGE: "exImage",
  SVG: "svg",
  ICON: "icon",
  GIF: "gif"
};

/**
 * 获取资源路径
 * @param {string} fileName - 资源文件名
 * @param {string} type - 资源类型
 * @returns {string} 完整的资源路径
 */
export const getResourcePath = (fileName, type = ResourceType.IMAGE) => {
  switch (type) {
    case ResourceType.IMAGE:
      return `/src/assets/images/${fileName}`;
    case ResourceType.EX_IMAGE:
      return `/src/assets/images/exImages/${fileName}`;
    case ResourceType.SVG:
      return `/src/assets/${fileName}`;
    case ResourceType.ICON:
      return `/src/assets/icons/${fileName}`;
    case ResourceType.GIF:
      return `/src/assets/images/exImages/${fileName}`;
    default:
      return `/src/assets/${fileName}`;
  }
};

/**
 * 获取图片资源路径
 * @param {string} fileName - 图片文件名
 * @returns {string} 完整的图片资源路径
 */
export const getImagePath = (fileName) => {
  return getResourcePath(fileName, ResourceType.IMAGE);
};

/**
 * 获取示例图片资源路径
 * @param {string} fileName - 示例图片文件名
 * @returns {string} 完整的示例图片资源路径
 */
export const getExImagePath = (fileName) => {
  return getResourcePath(fileName, ResourceType.EX_IMAGE);
};

/**
 * 获取SVG资源路径
 * @param {string} fileName - SVG文件名
 * @returns {string} 完整的SVG资源路径
 */
export const getSvgPath = (fileName) => {
  return getResourcePath(fileName, ResourceType.SVG);
};

/**
 * 获取GIF资源路径
 * @param {string} fileName - GIF文件名
 * @returns {string} 完整的GIF资源路径
 */
export const getGifPath = (fileName) => {
  return getResourcePath(fileName, ResourceType.GIF);
};

/**
 * 预加载图片资源
 * @param {Array<string>} imagePaths - 图片路径数组
 * @returns {Promise<Array<HTMLImageElement>>} 加载完成的图片对象数组
 */
export const preloadImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map((path) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    })
  );
};

/**
 * 资源管理器对象
 */
export const resourceManager = {
  getPath: getResourcePath,
  getImage: getImagePath,
  getExImage: getExImagePath,
  getSvg: getSvgPath,
  getGif: getGifPath,
  preloadImages,
  ResourceType
};

export default resourceManager;
