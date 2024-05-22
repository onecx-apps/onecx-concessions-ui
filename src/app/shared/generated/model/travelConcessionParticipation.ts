/**
 * onecx-concessions bff
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface TravelConcessionParticipation { 
    modificationCount?: number;
    creationDate?: string;
    creationUser?: string;
    modificationDate?: string;
    modificationUser?: string;
    id?: string;
    participantSince?: string;
    principalAuthorizedUserId?: string;
    state?: TravelConcessionParticipationStateEnum;
}
export enum TravelConcessionParticipationStateEnum {
    Requested = 'REQUESTED',
    Declined = 'DECLINED',
    Cancelled = 'CANCELLED',
    Active = 'ACTIVE',
    AwaitingPayment = 'AWAITING_PAYMENT'
};



