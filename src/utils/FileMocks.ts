import { Readable } from 'stream';

export const createMockFile = (): Express.Multer.File => ({
  fieldname: 'screenshot',
  originalname: 'test-image.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: Buffer.from('test-image-data'),
  size: 12345,
  destination: '',
  filename: 'test-image.jpg',
  path: 'uploads/test-image.jpg',
  stream: Readable.from([]),
});
