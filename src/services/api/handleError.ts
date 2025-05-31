import { Result, err } from 'neverthrow';

export const handleError = (error: unknown): Result<never, Error> => {
    if (error instanceof Error) return err(error);
    return err(new Error('Unknown error occurred'));
};
