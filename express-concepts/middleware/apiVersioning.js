export const urlVersioning = (version) => (req, res, next) => {
    console.log("url version",version);
    console.log("req.path",req.path);
    console.log("req.baseUrl",req.baseUrl);
    if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not supported",
    });
  }
};

export const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not supported",
    });
  }
};

export const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");
  if (
    contentType &&
    contentType.includes(`application/vnd.api.${version}+json`)
  ) {
    next();
  } else {
    res.status(404).json({
      success: false,
      error: "API version not supported",
    });
  }
};
