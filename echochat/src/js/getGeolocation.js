export function geolocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          resolve(coords);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Геолокация не поддерживается браузером"));
    }
  });
}
