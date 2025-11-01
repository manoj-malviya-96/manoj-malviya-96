![Code Quality](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop)

# My Coding Philosophy

Three Purposes I have when I wrote code - 

**CORRECT** _Code works reliably under all conditions_  
**FAST** _Code performs efficiently at scale_  
**MAINTAINABLE** _Code evolves without degrading quality_

![Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=200&fit=crop)
### Rule 1 - Compose Small, Readable Pieces [Foundation]
_Build with small, focused functions that do one thing well._
- Write functions with single responsibilities
- Use descriptive names that reveal intent
- Limit nesting to 2-3 levels
- Favor composition over inheritance
- Minimize coupling between modules
- Design for deletion—make components replaceable

### Rule 2 - Make Correctness Automatic [CORRECT]

Prevent bugs at compile-time, catch them immediately at runtime.

- Explicit static types > comments
- Make invalid states unrepresentable
- Validate inputs at boundaries / function shouldn't assume
- Fail fast and loudly / no silent failures
- Write clear error messages - what failed, why, how to fix
- Test edge cases - empty, null, extremes


![Performance Monitoring](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=200&fit=crop)

### Rule 3 - Measure, Then Optimize [FAST]
_Profile before optimizing. Evidence beats intuition._

- Instrument critical paths with metrics
- Profile in production-like conditions
- Optimize real bottlenecks, not guesses
- Choose algorithms that minimize complexity
- Cache when profiling proves it helps
- Test under realistic load
- Benchmark before and after changes


![Evolution](https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=800&h=200&fit=crop)

### Rule 4 - Simplify Change [MAINTAINABLE]
_Code is read and modified 10x more than written._

- Use Doc Strings to Document *why* decisions were made 
- Keep configuration explicit and centralized
- Version APIs and interfaces
- Write tests that document expected behavior
- Maintain consistency within the project > Coder Preference

## The Process

```mermaid
graph TD
    A[Compose Small, Readable Pieces] --> B[Make Correctness Automatic]
    B --> C[Measure Performance]
    C --> D[Optimize With Evidence]
    D --> E[Simplify Change]
    
    B -.->|Achieves| F[CORRECT]
    D -.->|Achieves| G[FAST]
    E -.->|Achieves| H[MAINTAINABLE]
    
    style F fill:#90EE90
    style G fill:#87CEEB
    style H fill:#FFB6C1
```

