<template>
  <form id="confirmationForm" name="confirmationForm" action="http://localhost:8080/oauth/authorize" method="post"><input
    name="user_oauth_approval" value="true" type="hidden">
    <ul>
      <li>
        <div class="form-group">scope.all:
          <input type="radio" name="scope.all" value="true">Approve
          <input type="radio" name="scope.all" value="false" checked="">Deny
        </div>
      </li>
    </ul>
    <label><input name="authorize" value="Authorize" type="submit"></label></form>
</template>

<script>
import {postRequest} from "../utils/api";

export default {
  name: "ConfirmAccess"
}
</script>

<style scoped>

</style>
