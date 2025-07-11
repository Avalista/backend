import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

export const fileValidators = [
  new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
  new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
];
