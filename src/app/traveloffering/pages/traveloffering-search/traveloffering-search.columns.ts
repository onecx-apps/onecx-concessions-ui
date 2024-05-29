import { ColumnType, DataTableColumn } from '@onecx/portal-integration-angular';

export const travelofferingSearchColumns: DataTableColumn[] = [
  {
    columnType: ColumnType.STRING,
    id: 'name',
    nameKey: 'GENERAL.TRAVEL_OFFERING.NAME',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'allowedWagonClass',
    nameKey: 'GENERAL.TRAVEL_OFFERING.ALLOWED_WAGON_CLASS',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'remoteId',
    nameKey: 'GENERAL.TRAVEL_OFFERING.REMOTE_ID',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'group',
    nameKey: 'GENERAL.TRAVEL_OFFERING.GROUP',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
  {
    columnType: ColumnType.STRING,
    id: 'state',
    nameKey: 'GENERAL.TRAVEL_OFFERING.STATE',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'TRAVELOFFERING_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
];