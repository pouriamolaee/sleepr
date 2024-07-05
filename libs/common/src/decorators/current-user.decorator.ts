import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '@app/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;
