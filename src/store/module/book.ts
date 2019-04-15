export interface Book {
    readonly id: string,
    readonly type_id: string,
    readonly title: string,
    readonly leader: string,
    readonly address: string,
    readonly start_time: Date,
    readonly end_time: Date,
    readonly sign_up_time: Date
}
