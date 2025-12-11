// ============================================================================
// Type Guards and Helper Functions
// ============================================================================

/**
 * Check if error is a MongoDB duplicate key error (E11000)
 */
const isDuplicateKeyError = (error: unknown): boolean => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
    );
};

/**
 * Extract the field name from duplicate key error
 */
const extractDuplicateField = (error: unknown): string => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'keyValue' in error &&
        typeof error.keyValue === 'object' &&
        error.keyValue !== null
    ) {
        const field = Object.keys(error.keyValue)[0];
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
    return 'Record';
};

/**
 * Check if error is a MongoDB validation error
 */
const isValidationError = (error: unknown): boolean => {
    return (
        error instanceof Error &&
        error.name === 'ValidationError'
    );
};

/**
 * Extract validation error message
 */
const extractValidationMessage = (error: unknown): string => {
    if (error instanceof Error && 'errors' in error) {
        const errors = error.errors as Record<string, { message: string }>;
        const messages = Object.values(errors).map(err => err.message);
        return messages.join(', ');
    }
    return 'Validation failed';
};

/**
 * Check if error is a MongoDB cast error
 */
const isCastError = (error: unknown): boolean => {
    return (
        error instanceof Error &&
        error.name === 'CastError'
    );
};

/**
 * Check if error is a custom application error with statusCode
 */
const isAppError = (error: unknown): error is Error & { statusCode: number } => {
    return (
        error instanceof Error &&
        'statusCode' in error &&
        typeof error.statusCode === 'number'
    );
};

export {
    isDuplicateKeyError,
    extractDuplicateField,
    isValidationError,
    extractValidationMessage,
    isCastError,
    isAppError
};
