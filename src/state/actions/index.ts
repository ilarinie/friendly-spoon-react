import { UIAction } from './UIActions';
import { DomainAction } from './DomainActions';

export type AppAction = UIAction | DomainAction;
