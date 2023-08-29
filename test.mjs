import { pipeline } from 'transformers';
export const detector = await pipeline('object-detection', 'Xenova/yolos-small-300');

/**
 * @example
 * console.log(JSON.stringify(getObjectsInImage(), null, 2);
 */
export async function getObjectsInImage() {
  const img = document.getElementById('test-image');
  return await detector(img.src);
}

export const testObjects = [
  {
    "score": 0.9938555955886841,
    "label": "couch",
    "box": {
      "xmin": 0,
      "ymin": 0,
      "xmax": 639,
      "ymax": 474
    }
  },
  {
    "score": 0.9933578372001648,
    "label": "remote",
    "box": {
      "xmin": 331,
      "ymin": 79,
      "xmax": 368,
      "ymax": 190
    }
  },
  {
    "score": 0.9646490216255188,
    "label": "remote",
    "box": {
      "xmin": 39,
      "ymin": 72,
      "xmax": 180,
      "ymax": 115
    }
  },
  {
    "score": 0.9928960204124451,
    "label": "cat",
    "box": {
      "xmin": 339,
      "ymin": 17,
      "xmax": 642,
      "ymax": 378
    }
  }
];

/**
 * @example
 * renderObjects(testObjects);
 * @param {*[]} objects 
 * @returns 
 */
export function renderObjects(objects) {
    // Create a canvas element we can paint on
    const canvas = document.createElement('canvas');
    const img = document.getElementById('test-image');
    // Set size of the canvas element to match the size of the image
    // then add it to the DOM
    canvas.width = img.width;
    canvas.height = img.height; 
    document.body.append(canvas);

    // Get a 2D context to draw on the canvas
    const context = canvas.getContext("2d");
    // Paint the image onto the canvas
    context.drawImage(img, 0, 0);

    // Paint each box
    context.fillStyle = 'rgba(255,0,0,0.5)';
    objects.forEach((objects) => {
        const { xmin, xmax, ymin, ymax } = objects.box;
        const w = xmax - xmin;
        const h = ymax - ymin;
        context.fillRect(xmin, ymin, w, h);
    });
    return {
        canvas,
        img,
        context,
    };
}

export async function buttonRenderObjects() {
  const objects = await getObjectsInImage();
  renderObjects(objects);
  window.lastObjects = objects;
}
