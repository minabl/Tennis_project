import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StatsService } from '../Services/Status/stats.service';

export const autrGuard: CanActivateFn = (route, state) => {
  let stat=inject(StatsService)
  let router =inject(Router)
  if(stat.authState.authorities.includes('ROLE_ADMIN')){
    console.log(stat);
    return true;
  }else{
  router.navigate(['/privee/notAuthorized']);
  return false
}
};
