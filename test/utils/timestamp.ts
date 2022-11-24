
export function dateTimestamp(): string {
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return `${year}-${month}-${date}`;
}
export function timeTimestamp(): string {
    let date_ob = new Date();

    let hours = ("0" + (date_ob.getHours())).slice(-2);
    let minutes = ("0" + (date_ob.getMinutes())).slice(-2);
    return `${hours}:${minutes}`;
}

export default function nowTimestamp(): string {
    return `${dateTimestamp()} ${timeTimestamp()}`
}