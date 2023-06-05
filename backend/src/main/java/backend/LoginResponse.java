package backend;

public class LoginResponse {

    private boolean exists;
    private User user;

    public LoginResponse(boolean exists, User user) {
        this.exists = exists;
        this.user = user;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}