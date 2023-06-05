package backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<User> findByNomeContaining(String keyword);

    List<User> findByEmailContaining(String keyword);

    List<User> findByFoneContaining(String keyword);
}