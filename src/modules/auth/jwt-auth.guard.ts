import { AuthGuard } from "@nestjs/passport";
/**
 * Guard to protect admin routes
 */
export class JwtAuthGuard extends AuthGuard('jwt'){}