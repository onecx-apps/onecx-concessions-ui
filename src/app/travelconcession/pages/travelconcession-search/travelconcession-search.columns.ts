import { ColumnType, DataTableColumn } from '@onecx/portal-integration-angular';

export const travelconcessionSearchColumns: DataTableColumn[] = [
  {
    columnType: ColumnType.STRING,
    id: 'offering.name',
    nameKey: 'GENERAL.TRAVEL_CONCESSION.OFFERING',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'FEATURE_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'FEATURE_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'FEATURE_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'state',
    nameKey: 'GENERAL.TRAVEL_CONCESSION.STATE',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'FEATURE_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'FEATURE_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'FEATURE_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'principalRole',
    nameKey: 'GENERAL.TRAVEL_CONCESSION.PRINCIPAL_ROLE',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'FEATURE_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'FEATURE_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'FEATURE_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'customerRelationToPrincipal',
    nameKey: 'GENERAL.TRAVEL_CONCESSION.CUSTOMER_RELATION_TO_PRINCIPAL',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'FEATURE_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'FEATURE_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'FEATURE_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
];
