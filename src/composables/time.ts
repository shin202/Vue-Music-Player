export const get_time = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${pad_to_2_digits(minutes)}:${pad_to_2_digits(seconds)}`;
}

export const pad_to_2_digits = (number: number): string => {
    return number.toString().padStart(2, '0');
}