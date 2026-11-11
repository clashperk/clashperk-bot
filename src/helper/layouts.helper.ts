// Higher numbers in a layout ID aren't a hall level, so the label leaves them out.
const MAX_HALL_LEVEL = 30;

/** The village in a layout ID (`TH17:HV:…`), or the Capital district after `CC`. */
const LAYOUT_TYPES: Record<string, string> = {
  'WB': 'Town Hall',
  'HV': 'Town Hall',
  'BB2': 'Builder Base',
  'CC:0': 'Capital Peak',
  'CC:1': 'Barbarian Champ',
  'CC:2': 'Wizard Valley',
  'CC:3': 'Balloon Lagoon',
  'CC:4': "Builder's Workshop",
  'CC:5': 'Dragon Cliff',
  'CC:6': 'Golem Quarry',
  'CC:7': 'Skeleton Park',
  'CC:8': 'Goblin Mines'
};

/** "Town Hall 17 Layout", or null for a layout type ClashPerk doesn't know. */
export function layoutLabel(link: string) {
  const layoutId = new URL(link).searchParams.get('id');
  if (!layoutId) return null;
  const [levelString, layoutType, buildingType] = layoutId.split(':');
  const buildingLabel = ['HV', 'BB2', 'WB'].includes(layoutType)
    ? LAYOUT_TYPES[layoutType]
    : LAYOUT_TYPES[`CC:${buildingType}`];
  if (!buildingLabel) return null;
  const level = Number(levelString.replace('TH', ''));
  return level > 0 && level <= MAX_HALL_LEVEL
    ? `${buildingLabel} ${level} Layout`
    : `${buildingLabel} Layout`;
}
