import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import { MulterError } from "multer";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        let statusCode = 500
        let message = "Internal Server Error";

        if (exception instanceof MulterError) {
            if (exception.code === 'LIMIT_FILE_SIZE') {
                statusCode = 413;
                message = 'File size exceeds the limit';
            }
            else {
                statusCode = 400;
                message = exception.message;
            }
        }

        else if (exception instanceof HttpException) {
            const status = exception.getStatus();

            if (status !== 500) {
                statusCode = status;
                const res = exception.getResponse();

                if (typeof res === 'string') {
                    message = res;

                } else if (typeof res === 'object' && res !== null && 'message' in res) {
                    message = Array.isArray((res as any).message)
                        ? (res as any).message.join(', ')
                        : (res as any).message;
                }
            }
        }

        response.status(statusCode).json({
            statusCode,
            message,
            time: new Date().toISOString(),
        })
    }
}