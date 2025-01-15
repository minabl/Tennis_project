import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { StatsService } from '../Services/Status/stats.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  let stat=inject(StatsService);
  let router=inject(Router);
  if(stat.authState.isLoggedIn==true)
  return true;
else{
  router.navigate(["/login"])
  return false;
}
  
};
